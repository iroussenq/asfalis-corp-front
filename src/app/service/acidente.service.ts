import { Acidente } from './../domain/acidente';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcidenteService {
  url = 'http://localhost:8080/acidente/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<Acidente[]> {
    return this.http.get<Acidente[]>(this.url + 'consultar');
  }

  cadastrar(
    idCondutor: string,
    idPolicial: string,
    idRodovia: string,
    idVeiculo: string,
    dataDoAcidente: string,
    relatorio: string,
    casualidades: number
  ): Observable<Acidente> {
    return this.http.post<Acidente>(this.url + 'cadastrar', {
      idCondutor,
      idPolicial,
      idRodovia,
      idVeiculo,
      dataDoAcidente,
      relatorio,
      casualidades,
    });
  }

  adicionarMulta(id: string, idMulta: string): Observable<Acidente> {
    return this.http.put<Acidente>(this.url + 'adicionar-multa/' + id, {
      idsMultas: [idMulta],
    });
  }

  remover(id: string): Observable<Acidente> {
    return this.http.delete<Acidente>(this.url + 'remover/' + id);
  }
}
