import { PolicialModel } from './../model/policial-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PolicialService {
  url = 'http://localhost:8080/policial/';

  constructor(private http: HttpClient) {}

  cadastrar(model: PolicialModel): Observable<PolicialModel> {
    return this.http.post<PolicialModel>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: PolicialModel): Observable<PolicialModel> {
    return this.http.put<PolicialModel>(this.url + 'alterar', model);
  }

  consultar(): Observable<PolicialModel[]> {
    return this.http.get<PolicialModel[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<PolicialModel> {
    return this.http.delete<PolicialModel>(this.url + 'remover/' + id);
  }
}
