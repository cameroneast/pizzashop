using Microsoft.EntityFrameworkCore;
using pizzashop.Server.Models;

namespace pizzashop.Server.Data
{
    public class PizzaShopDbContext : DbContext
    {
        public PizzaShopDbContext(DbContextOptions<PizzaShopDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
    }
}