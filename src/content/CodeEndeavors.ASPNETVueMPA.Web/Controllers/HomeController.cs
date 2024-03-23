using Microsoft.AspNetCore.Mvc;

namespace CodeEndeavors.ASPNETVueMPA.Controllers;
public class HomeController : Controller
{
    public IActionResult Index()
    {
        return View();
    }
}