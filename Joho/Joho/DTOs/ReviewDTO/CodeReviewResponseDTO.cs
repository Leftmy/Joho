namespace Joho.DTOs.ReviewDTO
{
    public record CodeReviewResponseDTO
    {
        public int Score { get; init; }
        public string Summary { get; init; } = string.Empty;
        public List<CodeIssueDTO> Issues { get; init; } = new();

        public string ModelUsed { get; init; } = string.Empty;
        public long ExecutionTimeMs { get; init; }
    }
}
