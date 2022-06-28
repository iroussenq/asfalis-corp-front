import { Veiculo } from './../domain/veiculo';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VeiculoModel } from '../model/veiculo-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VeiculoService {
  url = 'http://localhost:8080/veiculo/';

  constructor(private http: HttpClient) {}

  cadastrar(model: VeiculoModel): Observable<Veiculo> {
    return this.http.post<Veiculo>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: VeiculoModel): Observable<Veiculo> {
    return this.http.put<Veiculo>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Veiculo[]> {
    return this.http.get<Veiculo[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<Veiculo> {
    return this.http.delete<Veiculo>(this.url + 'remover/' + id);
  }
}
