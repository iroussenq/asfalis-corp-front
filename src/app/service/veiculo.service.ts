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

  cadastrar(model: VeiculoModel): Observable<VeiculoModel> {
    return this.http.post<VeiculoModel>(this.url + 'cadastrar', model);
  }

  alterar(id: string, model: VeiculoModel): Observable<VeiculoModel> {
    return this.http.put<VeiculoModel>(this.url + 'alterar', model);
  }

  consultar(): Observable<VeiculoModel[]> {
    return this.http.get<VeiculoModel[]>(this.url + 'consultar');
  }

  remover(id: string): Observable<VeiculoModel> {
    return this.http.delete<VeiculoModel>(this.url + 'remover/' + id);
  }
}
