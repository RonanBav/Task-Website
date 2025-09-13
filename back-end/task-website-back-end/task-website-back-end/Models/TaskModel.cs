using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace task_website_back_end.Models
{
    public class TaskModel
    {
        [Key]
        public int Id { get; set; }

        public required string Name { get; set; }

        public bool IsCompleted { get; set; } = false;
        public required DateOnly Date { get; set; }

        public string Description { get; set; } = null!;

        public int CategoryId { get; set; }

        public virtual Category Category { get; set; } = null!;


        public string TaskAuthor { get; set; } = null!;


    }
}
