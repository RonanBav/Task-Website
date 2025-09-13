using Microsoft.EntityFrameworkCore;
using task_website_back_end.DTOs;
using task_website_back_end.Models;

namespace task_website_back_end.Services
{
    public class MappingService
    {
        private readonly DatabaseContext dbContext;

        public MappingService(DatabaseContext dbContext): base()
        {
            this.dbContext = dbContext;
        }

        public TaskModel TaskDTOToTask(TaskModelDTO DTO)
        {
            var taskModel = new TaskModel 
            { 
                Id = DTO.Id, 
                Name = DTO.Name, 
                Date = DTO.Date, 
                Description = DTO.Description, 
                IsCompleted = DTO.IsCompleted, 
                CategoryId = DTO.CategoryId,
                TaskAuthor = DTO.TaskAuthor
            };

           


            return taskModel;
        }


        public TaskModelDTO TaskModelToDTO(TaskModel Task)
        {
            var DTO = new TaskModelDTO
            {
                Id = Task.Id,
                Name = Task.Name,
                Date = Task.Date,
                Description = Task.Description,
                IsCompleted = Task.IsCompleted,
                CategoryId = Task.CategoryId,
                CategoryName = Task.Category.Name,
                TaskAuthor = Task.TaskAuthor
            };
            


            return DTO;
        }
    }
}
