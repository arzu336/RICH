using Microsoft.AspNetCore.Mvc;
using RichBackend.Models;

namespace RichBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private static List<User> users = new List<User>();

        [HttpPost("register")]
        public IActionResult Register(RegisterRequest request)
        {
            var existingUser = users.FirstOrDefault(u => u.Email == request.Email);

            if (existingUser != null)
                return BadRequest("Bu e-posta adresi zaten kayıtlı.");

            var user = new User
            {
                Id = users.Count + 1,
                FullName = request.FullName,
                Email = request.Email,
                Password = request.Password
            };

            users.Add(user);

            return Ok(new
            {
                message = "Kayıt başarılı.",
                userId = user.Id,
                fullName = user.FullName,
                email = user.Email
            });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginRequest request)
        {
            var user = users.FirstOrDefault(u =>
                u.Email == request.Email &&
                u.Password == request.Password);

            if (user == null)
                return Unauthorized("E-posta veya şifre hatalı.");

            return Ok(new
            {
                message = "Giriş başarılı.",
                userId = user.Id,
                fullName = user.FullName,
                email = user.Email
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            return Ok(new { message = "Çıkış başarılı." });
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteAccount(int id)
        {
            var user = users.FirstOrDefault(u => u.Id == id);

            if (user == null)
                return NotFound("Kullanıcı bulunamadı.");

            users.Remove(user);

            return Ok(new { message = "Hesap silindi." });
        }
    }
}