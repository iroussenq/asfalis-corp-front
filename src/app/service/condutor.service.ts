import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CondutorModel } from '../model/condutor-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CondutorService {
  url = 'http://localhost:8080/condutor/';

  constructor(private http: HttpClient) {}

  cadastrar(model: CondutorModel): Observable<CondutorModel> {
    return this.http.post<CondutorModel>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: CondutorModel): Observable<CondutorModel> {
    return this.http.put<CondutorModel>(this.url + 'alterar', model);
  }

  consultar(): Observable<CondutorModel[]> {
    return this.http.get<CondutorModel[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<CondutorModel> {
    return this.http.delete<CondutorModel>(this.url + 'remover/' + id);
  }
}
