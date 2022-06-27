import { VeiculoModel } from './../model/veiculo-model';
import { Veiculo } from './../domain/veiculo';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss'],
})
export class VeiculoComponent implements OnInit {
  list: Veiculo[] = [];

  formVeiculo: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    placa: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
    ]),
    ano: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.get().subscribe((domains: Veiculo[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formVeiculo.controls['id'].value;
    const veiculoModel: VeiculoModel = this.formVeiculo.getRawValue();
    if (id) {
      this.put(id, veiculoModel).subscribe((domain: Veiculo) => {
        if (domain.id) {
          this.carregaTabela();
          this.formVeiculo.reset();
        }
      });
    } else {
      this.post(veiculoModel).subscribe((domain: Veiculo) => {
        if (domain.id) {
          this.list.push(domain);
          this.formVeiculo.reset();
        }
      });
    }
  }

  editar(veiculo: Veiculo) {
    this.formVeiculo.controls['id'].setValue(veiculo.id);
    this.formVeiculo.controls['nome'].setValue(veiculo.nome);
    this.formVeiculo.controls['placa'].setValue(veiculo.placa);
    this.formVeiculo.controls['ano'].setValue(veiculo.ano);
  }

  excluir(veiculo: Veiculo) {
    const id = this.formVeiculo.controls['id'].value;
    this.delete(veiculo.id).subscribe((domain: Veiculo) => {
      if (domain.id) {
        this.carregaTabela();
        this.formVeiculo.reset();
      }
    });
  }

  private post(model: VeiculoModel): Observable<Veiculo> {
    const url = 'http://localhost:8080/veiculo/cadastrar';
    return this.http.post<Veiculo>(url, model);
  }

  private get(): Observable<Veiculo[]> {
    const url = 'http://localhost:8080/veiculo/consultar';
    return this.http.get<Veiculo[]>(url);
  }

  private put(id: string, model: VeiculoModel): Observable<Veiculo> {
    const url = 'http://localhost:8080/veiculo/alterar/' + id;
    return this.http.put<Veiculo>(url, model);
  }

  private delete(id: string): Observable<Veiculo> {
    const url = 'http://localhost:8080/veiculo/remover/' + id;
    return this.http.delete<Veiculo>(url);
  }
}
