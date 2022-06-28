import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CondutorModel } from '../model/condutor-model';
import { Observable } from 'rxjs';
import { Condutor } from '../domain/condutor';

@Injectable({
  providedIn: 'root',
})
export class CondutorService {
  url = 'http://localhost:8080/condutor/';

  constructor(private http: HttpClient) {}

  cadastrar(model: CondutorModel): Observable<Condutor> {
    return this.http.post<Condutor>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: CondutorModel): Observable<Condutor> {
    return this.http.put<Condutor>(this.url + 'alterar/' + id, model);
  }

  consultar(): Observable<Condutor[]> {
    return this.http.get<Condutor[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<Condutor> {
    return this.http.delete<Condutor>(this.url + 'remover/' + id);
  }
}
