using Joho.DTOs.ReviewDTO;
using System.Diagnostics;
using System.Net.Http.Headers;
using System.Text.Json;
using System.Text;


namespace Joho.Services.Review
{
    public class AIService : IAIService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;

        public AIService(IConfiguration configuration, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;
        }

        public async Task<CodeReviewResponseDTO> ReviewCodeAsync(CodeReviewRequestDTO request, CancellationToken cancellationToken = default)
        {
            var stopwatch = Stopwatch.StartNew();

            var apiKey = GetApiKey(request.Provider, request.CustomApiKey);
            var systemPrompt = BuildSystemPrompt(request.Language, request.FocusArea);
            var userPrompt = $"Code to review:\n```\n{request.Code}\n```";

            // Відправляємо запит з урахуванням провайдера
            var rawJsonResponse = await SendLlmRequestAsync(
                request.Provider,
                request.Model,
                apiKey,
                systemPrompt,
                userPrompt,
                cancellationToken
            );

            stopwatch.Stop();

            var reviewResult = ParseLlmResponse(rawJsonResponse);

            return new CodeReviewResponseDTO
            {
                Score = reviewResult.Score,
                Summary = reviewResult.Summary,
                Issues = reviewResult.Issues,
                ModelUsed = $"{request.Provider} / {request.Model}",
                ExecutionTimeMs = stopwatch.ElapsedMilliseconds
            };
        }

        private async Task<string> SendLlmRequestAsync(
            string provider,
            string model,
            string apiKey,
            string systemPrompt,
            string userPrompt,
            CancellationToken cancellationToken)
        {
            return provider.ToLowerInvariant() switch
            {
                "anthropic" or "claude" => await SendClaudeRequestAsync(model, apiKey, systemPrompt, userPrompt, cancellationToken),
                "gemini" or "google" => await SendGeminiRequestAsync(model, apiKey, systemPrompt, userPrompt, cancellationToken),
                _ => await SendOpenAiCompatibleRequestAsync(provider, model, apiKey, systemPrompt, userPrompt, cancellationToken)
            };
        }

        // 1. OpenAI, Groq, DeepSeek
        private async Task<string> SendOpenAiCompatibleRequestAsync(string provider, string model, string apiKey, string systemPrompt, string userPrompt, CancellationToken cancellationToken)
        {
            var baseUrl = provider.ToLowerInvariant() switch
            {
                "groq" => "https://api.groq.com/openai/v1/chat/completions",
                _ => "https://api.openai.com/v1/chat/completions"
            };

            using var request = new HttpRequestMessage(HttpMethod.Post, baseUrl);
            request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", apiKey);

            var body = new
            {
                model = model,
                messages = new[]
                {
                new { role = "system", content = systemPrompt },
                new { role = "user", content = userPrompt }
            },
                response_format = new { type = "json_object" }
            };

            request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
            using var doc = JsonDocument.Parse(responseJson);
            return doc.RootElement.GetProperty("choices")[0].GetProperty("message").GetProperty("content").GetString() ?? "{}";
        }

        // 2. Anthropic (Claude)
        private async Task<string> SendClaudeRequestAsync(string model, string apiKey, string systemPrompt, string userPrompt, CancellationToken cancellationToken)
        {
            using var request = new HttpRequestMessage(HttpMethod.Post, "https://api.anthropic.com/v1/messages");
            request.Headers.Add("x-api-key", apiKey);
            request.Headers.Add("anthropic-version", "2023-06-01");

            var body = new
            {
                model = model,
                max_tokens = 2000,
                system = systemPrompt,
                messages = new[]
                {
                new { role = "user", content = userPrompt }
            }
            };

            request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
            using var doc = JsonDocument.Parse(responseJson);
            return doc.RootElement.GetProperty("content")[0].GetProperty("text").GetString() ?? "{}";
        }

        // 3. Google Gemini
        private async Task<string> SendGeminiRequestAsync(string model, string apiKey, string systemPrompt, string userPrompt, CancellationToken cancellationToken)
        {
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}";
            using var request = new HttpRequestMessage(HttpMethod.Post, url);

            var body = new
            {
                system_instruction = new { parts = new { text = systemPrompt } },
                contents = new[]
                {
                new { parts = new[] { new { text = userPrompt } } }
            },
                generationConfig = new { responseMimeType = "application/json" }
            };

            request.Content = new StringContent(JsonSerializer.Serialize(body), Encoding.UTF8, "application/json");

            var response = await _httpClient.SendAsync(request, cancellationToken);
            response.EnsureSuccessStatusCode();

            var responseJson = await response.Content.ReadAsStringAsync(cancellationToken);
            using var doc = JsonDocument.Parse(responseJson);
            return doc.RootElement.GetProperty("candidates")[0].GetProperty("content").GetProperty("parts")[0].GetProperty("text").GetString() ?? "{}";
        }

        private string GetApiKey(string provider, string? customApiKey)
        {
            if (!string.IsNullOrWhiteSpace(customApiKey)) return customApiKey;

            var systemApiKey = _configuration[$"AiProviders:{provider}:ApiKey"];
            if (string.IsNullOrWhiteSpace(systemApiKey))
            {
                throw new InvalidOperationException($"API Key for provider '{provider}' is missing.");
            }

            return systemApiKey;
        }

        private string BuildSystemPrompt(string language, string focusArea)
        {
            var template = _configuration["Prompts:CodeReview"];

            if (string.IsNullOrWhiteSpace(template))
            {
                throw new InvalidOperationException("System prompt template 'Prompts:CodeReview' is missing in configuration.");
            }

            return template
                .Replace("{language}", language)
                .Replace("{focusArea}", focusArea);
        }

        private static CodeReviewResponseDTO ParseLlmResponse(string rawJson)
        {
            try
            {
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                return JsonSerializer.Deserialize<CodeReviewResponseDTO>(rawJson, options) ?? new CodeReviewResponseDTO();
            }
            catch
            {
                return new CodeReviewResponseDTO { Summary = "Failed to parse AI response.", Score = 0 };
            }
        }
    }
}