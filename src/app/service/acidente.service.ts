import { AcidenteModel } from './../model/acidente-model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AcidenteService {
  url = 'http://localhost:8080/acidente/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<AcidenteModel[]> {
    return this.http.get<AcidenteModel[]>(this.url + 'consultar');
  }

  cadastrar(
    idCondutor: string,
    idPolicial: string,
    idRodovia: string,
    idVeiculo: string,
    dataDoAcidente: string,
    relatorio: string,
    casualidades: number
  ): Observable<AcidenteModel> {
    return this.http.post<AcidenteModel>(this.url + 'cadastrar', {
      condutor: { id: idCondutor },
      policial: { id: idPolicial },
      rodovia: { id: idRodovia },
      veiculo: { id: idVeiculo },
      dataDoAcidente: dataDoAcidente,
      relatorio: relatorio,
      casualidades: casualidades,
    });
  }

  remover(id: string): Observable<AcidenteModel> {
    return this.http.delete<AcidenteModel>(this.url + 'remover/' + id);
  }
}
