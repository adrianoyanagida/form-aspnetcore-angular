using form_webapi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace form_webapi.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Pessoa> Pessoas { get; set; }
    }
}