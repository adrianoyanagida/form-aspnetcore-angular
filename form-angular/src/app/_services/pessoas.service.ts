import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../_models/Pessoa';

@Injectable({
  providedIn: 'root'
})
export class PessoasService {

  // Propriedades
  baseURL = 'http://localhost:8000/api/pessoas';

  // Construtor
  constructor(private http: HttpClient) {

  }

  // Funções
  getAllPessoas(): Observable<Pessoa[]> {
    return this.http.get<Pessoa[]>(this.baseURL);
  }

  deletePessoa(id: number) {
    return this.http.delete(`${this.baseURL}/id/${id}`);
  }

}
