using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyWebCookingApi.Models;

namespace MyWebCookingApi.DbContext
{
    public class CookingDbContext : IdentityDbContext<MyUser>
    {
        public DbSet<MyUser> MyUsers { get; set; }

        public CookingDbContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
