using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RichBackend.Models;

namespace RichBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly RichContext _context;

        public ProductsController(RichContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetProducts([FromQuery] string? category)
        {
            var products = new List<Product>
            {
                new Product { Id = 1, Name = "Kadın Elbise", Price = 1200, Image = "https://images.unsplash.com/photo-1539109136881-3be0616acf4b", Category = "kadin", Stok = 5, Renk = "Lacivert", Beden = "M" },
                new Product { Id = 2, Name = "Erkek Ceket", Price = 2500, Image = "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504", Category = "erkek", Stok = 3, Renk = "Siyah", Beden = "L" },
                new Product { Id = 3, Name = "Bebek Tulum", Price = 400, Image = "https://images.unsplash.com/photo-1522771935878-3a0373d4fe84", Category = "bebek", Stok = 10, Renk = "Beyaz", Beden = "0-3 Ay" },
                new Product { Id = 4, Name = "Çanta", Price = 800, Image = "https://images.unsplash.com/photo-1584917865442-de89df76afd3", Category = "aksesuar", Stok = 2, Renk = "Siyah", Beden = "Standart" }            
                };

            if (!string.IsNullOrEmpty(category))
            {
                products = products.Where(p => p.Category == category).ToList();
            }

            return Ok(products);
        }
    }
}