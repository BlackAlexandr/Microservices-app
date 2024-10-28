using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CompaniesService.Database.Entities
{
    public class Company
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int CompanyId { get; set; }

        public string CompanyName { get; set; }

        public string LegalAddress { get; set; }


        public void Update(int id, Company emp, DatabaseContext db)
        {
            var employee = db.Companies.Where(e => e.CompanyId == id).FirstOrDefault();
            employee.CompanyName = emp.CompanyName;
            employee.LegalAddress = emp.LegalAddress;

            db.SaveChanges();
        }
    }
}
