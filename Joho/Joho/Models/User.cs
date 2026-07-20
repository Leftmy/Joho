using Microsoft.AspNetCore.Identity;

namespace Joho.Models
{
    public class User : IdentityUser
    {

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
