using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using task_website_back_end.Models;

namespace task_website_back_end
{
    public class DatabaseContext: IdentityDbContext<IdentityUser>
    {
        public DatabaseContext(DbContextOptions options): base(options)
        {
            
        }

        public DbSet<TaskModel> Tasks { get; set; }
        public DbSet<Category> Categories { get; set;}
    }
}
