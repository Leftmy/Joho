using Microsoft.AspNetCore.Mvc;

namespace Joho.Controllers
{
    public class ReviewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
