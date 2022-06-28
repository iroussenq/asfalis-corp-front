import { Acidente } from './../domain/acidente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  url = 'http://localhost:8080/acidente/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<Acidente[]> {
    return this.http.get<Acidente[]>(this.url + 'consultar');
  }

  cadastrar(
    idCondutor: string,
    idPolicial: string,
    idRodovia: string,
    idVeiculo: string
  ): Observable<Acidente> {
    return this.http.post<Acidente>(this.url + 'cadastrar', {
      idCondutor,
      idPolicial,
      idRodovia,
      idVeiculo,
    });
  }

  adicionarMulta(id: string, idMulta: string): Observable<Acidente> {
    return this.http.put<Acidente>(this.url + 'adicionar-multa/' + id, {
      idsMultas: [idMulta],
    });
  }
}
