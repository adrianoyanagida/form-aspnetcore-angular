using System.Linq;
using System.Threading.Tasks;
using form_webapi.Data.Interfaces;
using form_webapi.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace form_webapi.Data.Repositories
{
    public class PessoaRepository : IPessoaRepository
    {
        private readonly DataContext _dataContext;

        public PessoaRepository(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        // CREATE
        public void Add<T>(T entity) where T : class
        {
            _dataContext.Add(entity);
        }

        // DELETE
        public void Delete<T>(T entity) where T : class
        {
            _dataContext.Remove(entity);
        }

        // UPDATE
        public void Update<T>(T entity) where T : class
        {
            _dataContext.Update(entity);
        }

        // READ
        public async Task<Pessoa[]> GetAllPessoasAsync()
        {
            IQueryable<Pessoa> pessoas = _dataContext.Pessoas;
            return await pessoas.ToArrayAsync();
        }

        public async Task<Pessoa[]> GetAllPessoasByNameAsync(string nome)
        {
            IQueryable<Pessoa> pessoas = _dataContext.Pessoas;
            pessoas = pessoas
                .AsNoTracking()
                .OrderBy(n => n.Nome)
                .Where(n => n.Nome.ToLower().Contains(nome.ToLower()));
            
            return await pessoas.ToArrayAsync();
        }

        public async Task<Pessoa> GetPessoaByIdAsync(int Id)
        {
            IQueryable<Pessoa> pessoa = _dataContext.Pessoas;
            pessoa = pessoa
            .AsNoTracking()
            .Where(i => i.Id == Id);

            return await pessoa.FirstOrDefaultAsync();
        }

        public async Task<bool> SaveChangesAsync()
        {
            return (await _dataContext.SaveChangesAsync()) > 0;
        }
    }
}