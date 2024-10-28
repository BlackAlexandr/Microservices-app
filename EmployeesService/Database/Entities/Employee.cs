using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesService.Database.Entities
{
    public class Employee
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int PersonnelId { get; set; }

        public string FullName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public int CompanyId { get; set; }

        public void Update (int id, Employee emp, DatabaseContext db)
        {
            var employee = db.Employees.Where(e => e.PersonnelId == id).FirstOrDefault();
            employee.FullName = emp.FullName;
            employee.DateOfBirth = emp.DateOfBirth;
            employee.Address = emp.Address;
            employee.CompanyId = emp.CompanyId;

            db.SaveChanges();
        }
    }
}
