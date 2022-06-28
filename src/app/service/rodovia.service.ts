import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RodoviaModel } from '../model/rodovia-model';
import { Rodovia } from '../domain/rodovia';

@Injectable({
  providedIn: 'root',
})
export class RodoviaService {
  url = 'http://localhost:8080/rodovia/';

  constructor(private http: HttpClient) {}

  cadastrar(rodoviaModel: RodoviaModel): Observable<Rodovia> {
    return this.http.post<Rodovia>(this.url + 'cadastrar', rodoviaModel);
  }

  consultar(): Observable<Rodovia[]> {
    return this.http.get<Rodovia[]>(this.url + 'consultar');
  }

  editar(id: string, model: RodoviaModel): Observable<Rodovia> {
    return this.http.put<Rodovia>(this.url + 'alterar/' + id, model);
  }

  excluir(id: string): Observable<Rodovia> {
    return this.http.delete<Rodovia>(this.url + 'remover/' + id);
  }
}
