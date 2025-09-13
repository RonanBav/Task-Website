using task_website_back_end.Models;

namespace task_website_back_end.DTOs
{
    public class TaskModelDTO
    {

        public int Id { get; set; }

        public required string Name { get; set; }

        public bool IsCompleted { get; set; } = false;
        public required DateOnly Date { get; set; }

        public string Description { get; set; } = null!;

        public int CategoryId { get; set; }

        public string CategoryName { get; set; } = null!;

        public string TaskAuthor { get; set; } = null!;

    }
}
