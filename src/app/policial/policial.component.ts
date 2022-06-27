import { PolicialModel } from './../model/policial-model';
import { Policial } from './../domain/policial';
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
  selector: 'app-policial',
  templateUrl: './policial.component.html',
  styleUrls: ['./policial.component.scss'],
})
export class PolicialComponent implements OnInit {
  list: Policial[] = [];

  formPolicial: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    patente: new FormControl(null, [Validators.required]),
    dataDeNascimento: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.get().subscribe((domains: Policial[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formPolicial.controls['id'].value;
    const policialModel: PolicialModel = this.formPolicial.getRawValue();
    if (id) {
      this.put(id, policialModel).subscribe((domain: Policial) => {
        if (domain.id) {
          this.carregaTabela();
          this.formPolicial.reset();
        }
      });
    } else {
      this.post(policialModel).subscribe((domain: Policial) => {
        if (domain.id) {
          this.list.push(domain);
          this.formPolicial.reset();
        }
      });
    }
  }

  editar(policial: Policial) {
    this.formPolicial.controls['id'].setValue(policial.id);
    this.formPolicial.controls['nome'].setValue(policial.nome);
    this.formPolicial.controls['cpf'].setValue(policial.cpf);
    this.formPolicial.controls['patente'].setValue(policial.patente);
    this.formPolicial.controls['dataDeNascimento'].setValue(
      policial.dataDeNascimento
    );
    this.formPolicial.controls['idade'].setValue(policial.idade);
  }

  excluir(policial: Policial) {
    const id = this.formPolicial.controls['id'].value;
    this.delete(policial.id).subscribe((domain: Policial) => {
      if (domain.id) {
        this.carregaTabela();
        this.formPolicial.reset();
      }
    });
  }

  private post(model: PolicialModel): Observable<Policial> {
    const url = 'http://localhost:8080/policial/cadastrar';
    return this.http.post<Policial>(url, model);
  }

  private get(): Observable<Policial[]> {
    const url = 'http://localhost:8080/policial/consultar';
    return this.http.get<Policial[]>(url);
  }

  private put(id: string, model: PolicialModel): Observable<Policial> {
    const url = 'http://localhost:8080/policial/alterar/' + id;
    return this.http.put<Policial>(url, model);
  }

  private delete(id: string): Observable<Policial> {
    const url = 'http://localhost:8080/policial/remover/' + id;
    return this.http.delete<Policial>(url);
  }
}
