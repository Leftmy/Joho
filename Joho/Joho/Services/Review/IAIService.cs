using Joho.DTOs.ReviewDTO;

namespace Joho.Services.Review
{
    public interface IAIService
    {
        Task<CodeReviewResponseDTO> ReviewCodeAsync(CodeReviewRequestDTO request, CancellationToken cancellationToken = default);
    }
}
