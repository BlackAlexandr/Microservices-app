using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CompaniesService.Database;
using CompaniesService.Database.Entities;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace CompaniesService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        DatabaseContext db;
        public CompaniesController(DatabaseContext databaseContext)
        {
            db = databaseContext;
        }
        // GET: api/<CompaniesController>
        [HttpGet]
        public IEnumerable<Company> Get()
        {
            return db.Companies.ToList();
        }

        // POST api/<CompaniesController>
        [HttpPost]
        public IActionResult Post([FromBody] Company comp)
        {
            db.Companies.Add(comp);
            db.SaveChanges();

            return CreatedAtAction("Get", comp);
        }

        // PUT api/<CompaniesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Company comp)
        {
            Company company = new Company();
            company.Update(id, comp, db);

            return NoContent();
        }

        // DELETE api/<CompaniesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            db.Companies.Remove(db.Companies.Where(e => e.CompanyId == id).FirstOrDefault());
            db.SaveChanges();
            return NoContent();
        }
    }
}
