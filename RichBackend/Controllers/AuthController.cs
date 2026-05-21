using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RichBackend.Models;
using RichBackend.Services;

namespace RichBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly RichContext _context;
        private readonly IEventPublisher _eventPublisher;

        public AuthController(RichContext context, IEventPublisher eventPublisher)
        {
            _context = context;
            _eventPublisher = eventPublisher;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest request)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (existingUser != null)
            {
                return BadRequest("Bu e-posta adresi zaten kayitli.");
            }

            var user = new User
            {
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            _eventPublisher.Publish("user.registered", new
            {
                user.Id,
                user.FullName,
                user.Email
            });

            return Ok(new
            {
                message = "Kayit basarili.",
                userId = user.Id,
                fullName = user.FullName,
                email = user.Email
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u =>
                u.Email == request.Email &&
                u.Password == request.Password);

            if (user == null)
            {
                return Unauthorized("E-posta veya sifre hatali.");
            }

            _eventPublisher.Publish("user.logged_in", new
            {
                user.Id,
                user.FullName,
                user.Email
            });

            return Ok(new
            {
                message = "Giris basarili.",
                userId = user.Id,
                fullName = user.FullName,
                email = user.Email
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            _eventPublisher.Publish("user.logged_out", new
            {
                message = "User logout endpoint called"
            });

            return Ok(new { message = "Cikis basarili." });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAccount(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound("Kullanici bulunamadi.");
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            _eventPublisher.Publish("user.deleted", new
            {
                user.Id,
                user.FullName,
                user.Email
            });

            return Ok(new { message = "Hesap silindi." });
        }
    }
}
