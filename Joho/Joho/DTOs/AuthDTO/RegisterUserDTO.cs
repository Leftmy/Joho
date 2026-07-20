using System.ComponentModel.DataAnnotations;

namespace Joho.DTOs.AuthDTO
{
    public record RegisterUserDTO
    {
        [Required]
        public string Username { get; init; } = string.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; init; } = string.Empty;
        [Required]
        public string Password { get; init; } = string.Empty;

    }
}
