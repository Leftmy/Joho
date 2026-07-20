namespace Joho.DTOs.ReviewDTO
{
    public record CodeReviewRequestDTO
    {
        public string Code { get; init; } = string.Empty;
        public string Language { get; init; } = "csharp";
        public string FocusArea { get; init; } = "General";

        public string Provider { get; init; } = "Groq"; // Groq, OpenAI, Anthropic
        public string Model { get; init; } = "llama-3.1-70b-versatile";

        public string? CustomApiKey { get; init; }
    }
}
