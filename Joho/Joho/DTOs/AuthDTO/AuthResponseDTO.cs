namespace Joho.DTOs.AuthDTO
{
    public record AuthResponseDTO
    {
        public string Token { get; init; } = string.Empty;
        public string RefreshToken { get; init; } = string.Empty;
        public DateTime ExpiresAt { get; init; }
    }
}
