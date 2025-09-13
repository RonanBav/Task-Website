using task_website_back_end.Models;

namespace task_website_back_end.DTOs
{
    public class TaskListPaginationDTO
    {
        public required List<TaskModelDTO> Tasks { get; set; }
        public int Count { get; set; }

    }
}
