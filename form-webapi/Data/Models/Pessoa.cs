using System;

namespace form_webapi.Data.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Telefone { get; set; }
        public string CidadeNatal { get; set; }
        public string CidadeAtual { get; set; }
        public string Endereco { get; set; }
        public string CPF { get; set; }
        public DateTime DataDeNascimento { get; set; }
    }
}