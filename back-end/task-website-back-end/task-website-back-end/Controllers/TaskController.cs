using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Threading.Tasks;
using task_website_back_end.DTOs;
using task_website_back_end.Models;
using task_website_back_end.Services;

namespace task_website_back_end.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly DatabaseContext dbContext;
        private readonly MappingService mapper;
        private readonly IHttpContextAccessor httpContext;

        public TaskController(DatabaseContext dbContext, MappingService mapper, IHttpContextAccessor httpContext) : base()
        {
            this.dbContext = dbContext;
            this.mapper = mapper;
            this.httpContext = httpContext;
            string user = httpContext?.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
        }


       

        [HttpGet("Categories")]

        public async Task<List<Category>> Get()
        {
            return await dbContext.Categories.ToListAsync();
        }

        [HttpGet]
        public async Task<TaskListPaginationDTO> Get([FromQuery] PaginationDTO paginationDTO)
        {
            var user = httpContext?.HttpContext?.User;
            Console.WriteLine(user);

            var tasks = new List<TaskModel> { };

            if (user != null && user.Identity.IsAuthenticated)
            {

             var userName = user.FindFirstValue(ClaimTypes.Name);
                tasks = await dbContext.Tasks
                   .Include(x => x.Category)
                   .Where(x => x.TaskAuthor.ToLower().Equals(userName.ToLower()))
                   .Skip((paginationDTO.page - 1) * paginationDTO.maxPerPage)
                   .Take(paginationDTO.maxPerPage)

                   .ToListAsync();
            }

            
           

            var taskDTOs = new List<TaskModelDTO> { };

            foreach (var task in tasks)
            {
                taskDTOs.Add(mapper.TaskModelToDTO(task));
            }

            return new TaskListPaginationDTO { Tasks = taskDTOs, Count = dbContext.Tasks.Count() };
        }

        [HttpGet("{id:int}")]

        public async Task<ActionResult<TaskModelDTO>> Get(int id)
        {

            var user = httpContext?.HttpContext?.User;
            var userName = user.FindFirstValue(ClaimTypes.Name);

            var task = await dbContext.Tasks
                .Include(x => x.Category)
                .Where(x => x.TaskAuthor.Equals(userName))
                .FirstOrDefaultAsync(x => x.Id == id);
            if (task is null || !user.Identity.IsAuthenticated)
            {
                return NotFound();
            }

            var dto = mapper.TaskModelToDTO(task);
            return dto;
        }

        [HttpGet("search")]

        public async Task<ActionResult<List<TaskModelDTO>>> Get([FromQuery] string search)
        {

            var user = httpContext?.HttpContext?.User;
            var userName = user.FindFirstValue(ClaimTypes.Name);

            var taskList = await dbContext.Tasks
                .Where(x => x.TaskAuthor.Equals(userName))
                .Where(x => x.Name.ToLower().Contains(search.ToLower()) || x.Description.ToLower().Contains(search.ToLower()))
                .Include(x => x.Category)
                .ToListAsync();

            var taskDTOList = new List<TaskModelDTO>();

            foreach (var task in taskList)
            {
                taskDTOList.Add(mapper.TaskModelToDTO(task));
            }

            if (!user.Identity.IsAuthenticated)
            {
                return NotFound();
            }

            return taskDTOList;

        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] TaskModelDTO DTO)
        {


            //if (await dbContext.Tasks.AnyAsync(x => x.Name == DTO.Name))
            //{
            //    return NotFound();
            //}


            var user = httpContext?.HttpContext?.User;
            var userName = user.FindFirstValue(ClaimTypes.Name);

            
                DTO.TaskAuthor = userName;
                
                var task = mapper.TaskDTOToTask(DTO);

                Console.WriteLine(task.TaskAuthor);

                await dbContext.Tasks.AddAsync(task);
                await dbContext.SaveChangesAsync();

         





                return Ok();
        }

         
        [HttpPut("{id:int}")]
        public async Task<ActionResult> Put([FromBody] TaskModelDTO DTO, int id)
           
        {

            var user = httpContext?.HttpContext?.User;
            var userName = user.FindFirstValue(ClaimTypes.Name);

            var exists = await dbContext.Tasks.Where(x => x.TaskAuthor.Equals(userName)).AnyAsync(x => x.Id == id);
            //var sameName = await dbContext.Tasks.AnyAsync(x => x.Id != id &&  x.Name == DTO.Name);

           

            if (!exists || !user.Identity.IsAuthenticated)
            {
                return NotFound();
            }

            
            var task = mapper.TaskDTOToTask(DTO);

            dbContext.Tasks.Update(task);
            await dbContext.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete]
        public async Task<ActionResult> Delete([FromQuery] int id)
        {

            var user = httpContext?.HttpContext?.User;
            var userName = user.FindFirstValue(ClaimTypes.Name);

            var exists = await dbContext.Tasks.Where(x => x.TaskAuthor.Contains(userName)).AnyAsync(x => x.Id == id);
            if (!exists || !user.Identity.IsAuthenticated)
            {
                return NotFound();
            }

            await dbContext.Tasks.Where(x => x.Id == id).ExecuteDeleteAsync();
            await dbContext.SaveChangesAsync();

            return Ok();
        }
    }
}
