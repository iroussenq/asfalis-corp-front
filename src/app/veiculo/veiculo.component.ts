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
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    placa: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    ano: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Veiculo[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const veiculoModel: VeiculoModel = this.formVeiculo.getRawValue();
    this.post(veiculoModel).subscribe((domain: Veiculo) => {
      if (domain.id) {
        this.list.push(domain);
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
}
