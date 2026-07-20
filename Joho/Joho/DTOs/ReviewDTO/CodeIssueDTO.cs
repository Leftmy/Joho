namespace Joho.DTOs.ReviewDTO
{
    public record CodeIssueDTO
    {
        public int LineNumber { get; init; }
        public string Severity { get; init; } = "Warning";
        public string Title { get; init; } = string.Empty;
        public string Description { get; init; } = string.Empty;
        public string SuggestedFix { get; init; } = string.Empty;
    }
}
