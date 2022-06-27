import { MultaModel } from './../model/multa-model';
import { Multa } from './../domain/multa';
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
  selector: 'app-multa',
  templateUrl: './multa.component.html',
  styleUrls: ['./multa.component.scss'],
})
export class MultaComponent implements OnInit {
  list: Multa[] = [];

  formMulta: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    condicaoDaMulta: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
    ]),
    valorDaMulta: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregaTabela;
  }

  private carregaTabela(): void {
    this.get().subscribe((domains: Multa[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formMulta.controls['id'].value;
    const multaModel: MultaModel = this.formMulta.getRawValue();
    if (id) {
      this.put(id, multaModel).subscribe((domain: Multa) => {
        if (domain.id) {
          this.carregaTabela();
          this.formMulta.reset();
        }
      });
    } else {
      this.post(multaModel).subscribe((domain: Multa) => {
        if (domain.id) {
          this.list.push(domain);
          this.formMulta.reset();
        }
      });
    }
  }

  editar(multa: Multa) {
    this.formMulta.controls['id'].setValue(multa.id);
    this.formMulta.controls['condicaoDaMulta'].setValue(multa.condicaoDaMulta);
    this.formMulta.controls['valorDaMulta'].setValue(multa.valorDaMulta);
  }

  excluir(multa: Multa) {
    const id = this.formMulta.controls['id'].value;
    this.delete(multa.id).subscribe((domain: Multa) => {
      if (domain.id) {
        this.carregaTabela();
        this.formMulta.reset();
      }
    });
  }

  private post(model: MultaModel): Observable<Multa> {
    const url = 'http://localhost:8080/multa/cadastrar';
    return this.http.post<Multa>(url, model);
  }

  private get(): Observable<Multa[]> {
    const url = 'http://localhost:8080/multa/consultar';
    return this.http.get<Multa[]>(url);
  }
  private put(id: string, model: MultaModel): Observable<Multa> {
    const url = 'http://localhost:8080/multa/alterar/' + id;
    return this.http.put<Multa>(url, model);
  }

  private delete(id: string): Observable<Multa> {
    const url = 'http://localhost:8080/multa/remover/' + id;
    return this.http.delete<Multa>(url);
  }
}
