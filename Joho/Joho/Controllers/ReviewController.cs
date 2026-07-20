using System.ComponentModel.DataAnnotations;
using Joho.DTOs.ReviewDTO;
using Joho.Services.Review;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Joho.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReviewController : ControllerBase
    {
        private readonly IAIService _aiService;
        // private readonly IThirdPartyService _thirdPartyService;

        public ReviewController(IAIService aiService/*, ThirdPartyService thirdPartyService*/)
        {
            _aiService = aiService;
            //_thirdPartyService = thirdPartyService;
        }
        [HttpPost]
        public async Task<ActionResult<CodeReviewResponseDTO>> ReviewCode(
        [FromBody] CodeReviewRequestDTO request,
        CancellationToken cancellationToken)
        {
            if (string.IsNullOrWhiteSpace(request.Code))
            {
                return BadRequest(new { Message = "Code parameter cannot be empty." });
            }

            try
            {
                var result = await _aiService.ReviewCodeAsync(request, cancellationToken);
                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (HttpRequestException ex)
            {
                return StatusCode(502, new { Message = "Error communicating with AI Provider", Details = ex.Message });
            }
        }
    }
}
