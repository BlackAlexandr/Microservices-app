using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using EmployeesService.Database;
using EmployeesService.Database.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace EmployeesService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        DatabaseContext db;
        public EmployeeController(DatabaseContext databaseContext)
        {
            db = databaseContext;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public IEnumerable<Employee> Get()
        {
            return db.Employees.ToList();
        }

        // POST api/<EmployeeController>
        [HttpPost]
        public ActionResult Post([FromBody] Employee emp)
        {
            db.Employees.Add(emp);
            db.SaveChanges();
            return CreatedAtAction("Get", emp);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Employee emp)
        {
            Employee employee = new Employee();
            employee.Update(id, emp, db);

            return NoContent();
        }

        // PUT api/<EmployeeController>/5
        //[HttpPut("{id}")]
        //public IActionResult UpdateCompanyId(int idCompany)
        //{
        //    Employee employee = new Employee();
        //    employee.UpdateCompanyId(idCompany);

        //    return NoContent();
        //}

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            db.Employees.Remove(db.Employees.Where(e => e.PersonnelId == id).FirstOrDefault());
            db.SaveChanges();
            return NoContent();
        }
    }
}
