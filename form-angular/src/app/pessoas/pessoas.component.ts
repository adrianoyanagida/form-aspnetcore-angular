import { Component, OnInit, TemplateRef } from '@angular/core';
import { PessoasService } from '../_services/pessoas.service';
import { Pessoa } from '../_models/Pessoa';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  BsModalService,
  BsModalRef,
  defineLocale,
  BsLocaleService,
  ptBrLocale
} from 'ngx-bootstrap';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  // >>PROPRIEDADES<<
  pessoas: Pessoa[];
  pessoa: Pessoa;

  filtroDigitado: string;
  pessoasFiltradas: Pessoa[];
  modalRef: BsModalRef;
  cadastroForm: FormGroup;

  httpMethod: string;

  configSmall = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-sm'
  };

  configLarge = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-lg'
  };

  // >>CONSTRUTOR<<
  constructor(
    private pessoasService: PessoasService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private localeService: BsLocaleService
  ) { this.localeService.use('pt-br'); }

  // >>FUNÇÕES<<

  // ngOnInit : Funções chamadas no inicio
  ngOnInit() {
    this.getPessoas();
    this.validation();
  }

  // get e set filtro()
  get filtro(): string {
    return this.filtroDigitado;
  }

  set filtro(value: string) {
    this.filtroDigitado = value;
    /*
    (If Ternário)
    pessoasFiltradas = Caso o filtroDigitado estiver preenchido, então pessoasFiltradas recebe this.filtrar(this.filtro)
    caso filtroDigitado não estiver preenchido, pessoasFiltradas recebe this.pessoas
    */
    this.pessoasFiltradas = this.filtro ? this.filtrar(this.filtroDigitado) : this.pessoas;
  }

  // filtrar : Recebe uma string e filtra as pessoas[] pelo nome recebido
  filtrar(filtroDigitado: string): Pessoa[] {
    filtroDigitado = filtroDigitado.toLocaleLowerCase();
    return this.pessoas.filter(
      pessoa => pessoa.nome.toLocaleLowerCase().indexOf(filtroDigitado) !== -1
    );
  }

  criarPessoa(template: TemplateRef<any>) {
    this.resetFormAndPessoa();
    this.httpMethod = 'post';
    this.openModal(template, this.configLarge);
  }

  editarPessoa(pessoa: Pessoa, template: TemplateRef<any>) {
    this.resetFormAndPessoa();
    this.httpMethod = 'put';
    this.openModal(template, this.configLarge);
    this.pessoa = Object.assign({}, pessoa);
    this.cadastroForm.patchValue({
      nome: this.pessoa.nome,
      email: this.pessoa.email,
      dataDeNascimento: this.timeParser(this.pessoa.dataDeNascimento),
      telefone: this.pessoa.telefone,
      cidadeNatal: this.pessoa.cidadeNatal,
      cidadeAtual: this.pessoa.cidadeAtual,
      cpf: this.pessoa.cpf
    });
  }

  // excluirPessoa : Função para chamar o modal excluir pessoa
  excluirPessoa(pessoa: Pessoa, template: TemplateRef<any>) {
    this.resetFormAndPessoa();
    this.openModal(template, this.configSmall);
    this.pessoa = pessoa;
  }

  // confirmarDelete : Confirmar para excluir uma pessoa
  confirmarDelete(template: TemplateRef<any>) {
    this.pessoasService.deletePessoa(this.pessoa.id).subscribe(
      () => {
        this.modalRef.hide();
        this.getPessoas();
      }, error => { console.log(error); }
    );
  }

  salvarAlteracao() {
    if (!this.cadastroForm.valid) {
      return console.log('Ocorreu um erro na validação');
    }

    if (this.httpMethod === 'put') {
      this.pessoa = Object.assign({ id: this.pessoa.id }, this.cadastroForm.value);
      this.putPessoa(this.pessoa);
    }

    if (this.httpMethod === 'post') {
      this.pessoa = Object.assign({}, this.cadastroForm.value);
      this.postPessoa(this.pessoa);
    }
  }

  putPessoa(pessoa: Pessoa) {
    this.pessoasService.putPessoa(pessoa).subscribe(
      () => {
        this.modalRef.hide();
        this.getPessoas();
      }, error => {
        console.log(error);
      }
    );
  }

  postPessoa(pessoa: Pessoa) {
    this.pessoasService.postPessoa(pessoa).subscribe(
      () => {
        this.modalRef.hide();
        this.getPessoas();
      }, error => {
        console.log(error);
      }
    );
  }

  openModal(template: TemplateRef<any>, config: any) {
    this.modalRef = this.modalService.show(template, config);
  }

  validation() {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dataDeNascimento: ['', Validators.required],
      telefone: ['', Validators.required],
      cidadeNatal: ['', Validators.required],
      cidadeAtual: ['', Validators.required],
      cpf: ['', Validators.required]
    });
  }

  // getPessoas : Funções para pegar pessoas do Endpoint
  getPessoas() {
    this.pessoasService.getAllPessoas().subscribe(
      (pessoas: Pessoa[]) => {
        this.pessoas = pessoas;
        this.pessoasFiltradas = pessoas;
      }, error => {
        console.log(error);
      }
    );
  }

  timeParser(data: any) {
    const dataFormatada = data.split('T');
    return new Date(dataFormatada);
  }

  resetFormAndPessoa() {
    this.pessoa = undefined;
    this.cadastroForm.reset();
  }
}
