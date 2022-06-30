import { RodoviaModel } from './../model/rodovia-model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Rodovia } from './../domain/rodovia';

@Component({
  selector: 'app-rodovia',
  templateUrl: './rodovia.component.html',
  styleUrls: ['./rodovia.component.scss'],
})
export class RodoviaComponent implements OnInit {
  list: Rodovia[] = [];

  formRodovia: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cep: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^[0-9]{5}-[0-9]{3}$/),
    ]),
    mortes: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.get().subscribe((domains: Rodovia[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formRodovia.controls['id'].value;
    const rodoviaModel: RodoviaModel = this.formRodovia.getRawValue();
    if (id) {
      this.put(id, rodoviaModel).subscribe((domain: Rodovia) => {
        if (domain.id) {
          this.carregaTabela();
          this.formRodovia.reset();
        }
      });
    } else {
      this.post(rodoviaModel).subscribe((domain: Rodovia) => {
        if (domain.id) {
          this.list.push(domain);
          this.formRodovia.reset();
        }
      });
    }
  }

  editar(rodovia: Rodovia) {
    this.formRodovia.controls['id'].setValue(rodovia.id);
    this.formRodovia.controls['nome'].setValue(rodovia.nome);
    this.formRodovia.controls['cep'].setValue(rodovia.cep);
    this.formRodovia.controls['mortes'].setValue(rodovia.mortes);
  }

  excluir(rodovia: Rodovia) {
    const id = this.formRodovia.controls['id'].value;
    this.delete(rodovia.id).subscribe((domain: Rodovia) => {
      if (domain.id) {
        this.carregaTabela();
        this.formRodovia.reset();
      }
    });
  }

  private post(model: RodoviaModel): Observable<Rodovia> {
    const url = 'http://localhost:8080/rodovia/cadastrar';
    return this.http.post<Rodovia>(url, model);
  }

  private get(): Observable<Rodovia[]> {
    const url = 'http://localhost:8080/rodovia/consultar';
    return this.http.get<Rodovia[]>(url);
  }

  private put(id: string, model: RodoviaModel): Observable<Rodovia> {
    const url = 'http://localhost:8080/rodovia/alterar/' + id;
    return this.http.put<Rodovia>(url, model);
  }

  private delete(id: string): Observable<Rodovia> {
    const url = 'http://localhost:8080/rodovia/remover/' + id;
    return this.http.delete<Rodovia>(url);
  }
}
