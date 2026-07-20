using System.ComponentModel.DataAnnotations;

namespace Joho.DTOs.AuthDTO
{
    public record LoginUserDTO
    {
        [Required]
        public string Username { get; init; } = string.Empty;
        [Required]
        public string Password { get; init; } = string.Empty;
    }
}
