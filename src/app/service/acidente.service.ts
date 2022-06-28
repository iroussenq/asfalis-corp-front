import { Acidente } from './../domain/pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  url = 'http://localhost:8080/pedido/';

  constructor(private http: HttpClient) {}

  consultar(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.url + 'consultar');
  }

  cadastrar(idCliente: string, idFarmaceutico: string): Observable<Pedido> {
    return this.http.post<Pedido>(this.url + 'cadastrar', {
      idCliente,
      idFarmaceutico,
    });
  }

  adicionarProduto(id: string, idProduto: string): Observable<Pedido> {
    return this.http.put<Pedido>(this.url + 'adicionar-produto/' + id, {
      idsProdutos: [idProduto],
    });
  }

  pagar(id: string, valor: number): Observable<Pedido> {
    return this.http.put<Pedido>(this.url + 'pagar/' + id, {
      valor,
    });
  }
}
