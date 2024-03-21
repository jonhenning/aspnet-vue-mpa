using Microsoft.AspNetCore.Mvc;
using CodeEndeavors.ASPNETVueMPA.Models;

namespace CodeEndeavors.ASPNETVueMPA.Controllers;

public class CustomersController : Controller
{
    public static Dictionary<int, Customer> _fakeDatabase = new Dictionary<int, Customer>() {
        { 1, new Customer() { Id = 1, FirstName = "Frodo", LastName = "Baggins" } },
        { 2, new Customer() { Id = 2, FirstName = "Bilbo", LastName = "Baggins" } },
        { 3, new Customer() { Id = 3, FirstName = "Samwise", LastName = "Gamgee" } },
    };
    public IActionResult Index()
    {
        return View();
    }

    [Route("/customer/{id?}")]
    public IActionResult Edit(int? id)
    {
        ViewBag.CustomerId = id;
        return View();
    }

    //ajax endpoints
    [Route("/customer/getcustomer/{id}")]
    public JsonResult GetCustomer(int id)
    {
        return new JsonResult(_fakeDatabase.Values.Where(c => c.Id == id).FirstOrDefault());
    }

    [Route("/customer/getcustomers")]
    public JsonResult GetCustomers()
    {
        return new JsonResult(_fakeDatabase.Values);
    }

    [Route("/customer/save")]
    public JsonResult Save([FromBody] Customer customer)
    {
        if (!customer.Id.HasValue) {
            customer.Id = _fakeDatabase.Values.Max(c => c.Id) + 1;
        }
        _fakeDatabase[customer.Id.Value] = customer;
        return new JsonResult(customer);
    }
}