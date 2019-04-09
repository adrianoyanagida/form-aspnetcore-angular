import { Component, OnInit } from '@angular/core';
import { PessoasService } from '../_services/pessoas.service';
import { Pessoa } from '../_models/Pessoa';
import { BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  // >>PROPRIEDADES<<
  pessoas: Pessoa[];
  pessoa: Pessoa;

  // >>CONSTRUTOR<<
  constructor(
    private pessoasService: PessoasService,
    private modalService: BsModalService
    ) { }

  // >>FUNÇÕES<<

  // ngOnInit : Funções chamadas no inicio
  ngOnInit() {
    this.getPessoas();
  }

  // getPessoas : Funções para pegar pessoas do Endpoint
  getPessoas() {
    this.pessoasService.getAllPessoas().subscribe(
      (pessoas: Pessoa[]) => {
        this.pessoas = pessoas;
      }, error => {
        console.log(error);
      }
    );
  }

  // excluirEvento : Função para chamar o modal excluir pessoa
  excluirEvento(pessoa: Pessoa, template: any) {
    template.show();
    this.pessoa = pessoa;
  }

  // confirmarDelete : Confirmar para excluir uma pessoa
  confirmarDelete(template: any) {
    this.pessoasService.deletePessoa(this.pessoa.id).subscribe(
      () => {
        template.hide();
        this.getPessoas();
      }, error => { console.log(error); }
    );
  }
}
