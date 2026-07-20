using Joho.DTOs.AuthDTO;

namespace Joho.Services.Auth
{
    public interface IAuthService
    {
        Task<AuthResponseDTO> RegisterAsync(RegisterUserDTO registerDTO);
        Task<AuthResponseDTO> LoginAsync(LoginUserDTO loginDTO);
    }
}
