import { PolicialModel } from './../model/policial-model';
import { Policial } from './../domain/policial';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicialService {
  url = 'http://localhost:8080/policial/';

  constructor(private http: HttpClient) {}

  cadastrar(model: PolicialModel): Observable<Policial> {
    return this.http.post<Policial>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: PolicialModel): Observable<Policial> {
    return this.http.put<Policial>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Policial[]> {
    return this.http.get<Policial[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<Policial> {
    return this.http.delete<Policial>(this.url + 'remover/' + id);
  }
}
