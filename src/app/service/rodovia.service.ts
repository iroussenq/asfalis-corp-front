import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RodoviaModel } from '../model/rodovia-model';

@Injectable({
  providedIn: 'root',
})
export class RodoviaService {
  url = 'http://localhost:8080/rodovia/';

  constructor(private http: HttpClient) {}

  cadastrar(rodoviaModel: RodoviaModel): Observable<RodoviaModel> {
    return this.http.post<RodoviaModel>(this.url + 'cadastrar', rodoviaModel);
  }

  consultar(): Observable<RodoviaModel[]> {
    return this.http.get<RodoviaModel[]>(this.url + 'consultar');
  }

  alterar(id: string, model: RodoviaModel): Observable<RodoviaModel> {
    return this.http.put<RodoviaModel>(this.url + 'alterar', model);
  }

  remover(id: string): Observable<RodoviaModel> {
    return this.http.delete<RodoviaModel>(this.url + 'remover/' + id);
  }
}
