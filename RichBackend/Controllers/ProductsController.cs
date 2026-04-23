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
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            return await _context.Products.ToListAsync();
        }
    }
}