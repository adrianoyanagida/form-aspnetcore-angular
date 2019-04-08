using System.Threading.Tasks;
using form_webapi.Data.Interfaces;
using form_webapi.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace form_webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaRepository _pessoaRepository;

        public PessoasController(IPessoaRepository pessoaRepository)
        {
            _pessoaRepository = pessoaRepository;    
        }

        [HttpGet]
        public async Task<IActionResult> Get() {
            try
            {
                var pessoas = await _pessoaRepository.GetAllPessoasAsync();

                return Ok(pessoas);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Banco de dados falhou {e.Message}"
                );
            }
        }

        [HttpGet("id/{Id}")]
        public async Task<IActionResult> Get(int Id) {
            try
            {
                var pessoa = await _pessoaRepository.GetPessoaByIdAsync(Id);

                return Ok(pessoa);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Banco de dados falhou {e.Message}"
                );
            }
        }

        [HttpGet("nome/{Nome}")]
        public async Task<IActionResult> Get(string Nome) {
            try
            {
                var pessoas = await _pessoaRepository.GetAllPessoasByNameAsync(Nome);

                return Ok(pessoas);
            }
            catch (System.Exception e)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Banco de dados falhou {e.Message}"
                );
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Pessoa pessoa) {
            try
            {
                _pessoaRepository.Add(pessoa);

                if(await _pessoaRepository.SaveChangesAsync()) {
                    return Created($"/api/pessoas/id/{pessoa.Id}", pessoa);
                } else {
                    return BadRequest();
                }
            }
            catch (System.Exception e)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Banco de dados falhou {e.Message}"
                );
            }
        }

        [HttpPut("id/{Id}")]
        public async Task<IActionResult> Put(int Id, Pessoa pessoa) {
            try
            {
                var result = await _pessoaRepository.GetPessoaByIdAsync(Id);
                if (result == null) return NotFound();
                
                _pessoaRepository.Update(pessoa);

                if (await _pessoaRepository.SaveChangesAsync()) {
                    return Created($"/api/pessoas/id/{pessoa.Id}", pessoa);
                } else {
                    return BadRequest();
                }
            }
            catch (System.Exception e)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Banco de dados falhou {e.Message}"
                );
            }
        }
        
        [HttpDelete("id/{Id}")]
        public async Task<IActionResult> Delete(int Id) {
            try
            {
                var pessoa = await _pessoaRepository.GetPessoaByIdAsync(Id);
                if (pessoa == null) return NotFound();

                _pessoaRepository.Delete(pessoa);

                if(await _pessoaRepository.SaveChangesAsync()) {
                    return Ok();
                } else {
                    return BadRequest();
                }
            }
            catch (System.Exception e)
            {
                return this.StatusCode(
                    StatusCodes.Status500InternalServerError,
                    $"Banco de dados falhou {e.Message}"
                );
            }
        }
    }
}