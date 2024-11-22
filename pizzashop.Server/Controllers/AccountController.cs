using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using pizzashop.Server.Data;
using pizzashop.Server.Models;

namespace pizzashop.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly PizzaShopDbContext _context;

        public AccountController(PizzaShopDbContext context)
        {
            _context = context;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp([FromBody] SignUpRequest request)
        {
            var user = new User
            {
                Username = request.Username
            };

            var passwordHasher = new PasswordHasher<User>();
            user.Password = passwordHasher.HashPassword(user, request.Password);

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok("PizzaShop Backend: User with username " + user.Username + " created!");
        }
    }
}