using Microsoft.AspNetCore.Identity;

namespace Joho.Models
{
    public class User : IdentityUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
