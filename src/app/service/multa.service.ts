import { Multa } from './../domain/multa';
import { MultaModel } from './../model/multa-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MultaService {
  url = 'http://localhost:8080/multa/';

  constructor(private http: HttpClient) {}

  cadastrar(model: MultaModel): Observable<Multa> {
    return this.http.post<Multa>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: MultaModel): Observable<Multa> {
    return this.http.put<Multa>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Multa[]> {
    return this.http.get<Multa[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<Multa> {
    return this.http.delete<Multa>(this.url + 'remover/' + id);
  }
}
