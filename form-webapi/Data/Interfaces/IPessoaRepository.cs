using System.Threading.Tasks;
using form_webapi.Data.Models;

namespace form_webapi.Data.Interfaces
{
    public interface IPessoaRepository
    {
        void Add<T>(T entity) where T : class;

        void Update<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveChangesAsync();

        Task<Pessoa[]> GetAllPessoasAsync();

        Task<Pessoa[]> GetAllPessoasByNameAsync(string nome);

        Task<Pessoa> GetPessoaByIdAsync(int Id);
    }
}