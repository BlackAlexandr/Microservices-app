using EmployeesService.Database.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesService.Database
{
    public class DatabaseContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }

        public DatabaseContext(DbContextOptions<DatabaseContext> options): base(options)
        {
            Database.EnsureCreated();   // создаем базу данных при первом обращении
        }
    }
}
