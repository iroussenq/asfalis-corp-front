import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { Condutor } from './../domain/condutor';
import { CondutorModel } from '../model/condutor-model';

@Component({
  selector: 'app-condutor',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.scss'],
})
export class CondutorComponent implements OnInit {
  list: Condutor[] = [];

  formCondutor: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    statusCondutor: new FormControl(null, [Validators.required]),
    dataDeNascimento: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.get().subscribe((domains: Condutor[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formCondutor.controls['id'].value;
    const condutorModel: CondutorModel = this.formCondutor.getRawValue();
    if (id) {
      this.put(id, condutorModel).subscribe((domain: Condutor) => {
        if (domain.id) {
          this.carregaTabela();
          this.formCondutor.reset();
        }
      });
    } else {
      this.post(condutorModel).subscribe((domain: Condutor) => {
        if (domain.id) {
          this.list.push(domain);
          this.formCondutor.reset();
        }
      });
    }
  }

  editar(condutor: Condutor) {
    this.formCondutor.controls['id'].setValue(condutor.id);
    this.formCondutor.controls['nome'].setValue(condutor.nome);
    this.formCondutor.controls['cpf'].setValue(condutor.cpf);
    this.formCondutor.controls['statusCondutor'].setValue(
      condutor.statusCondutor
    );
    this.formCondutor.controls['dataDeNascimento'].setValue(
      condutor.dataDeNascimento
    );
    this.formCondutor.controls['idade'].setValue(condutor.idade);
  }

  excluir(condutor: Condutor) {
    const id = this.formCondutor.controls['id'].value;
    this.delete(condutor.id).subscribe((domain: Condutor) => {
      if (domain.id) {
        this.carregaTabela();
        this.formCondutor.reset();
      }
    });
  }

  private post(model: CondutorModel): Observable<Condutor> {
    const url = 'http://localhost:8080/condutor/cadastrar';
    return this.http.post<Condutor>(url, model);
  }

  private get(): Observable<Condutor[]> {
    const url = 'http://localhost:8080/condutor/consultar';
    return this.http.get<Condutor[]>(url);
  }

  private put(id: string, model: CondutorModel): Observable<Condutor> {
    const url = 'http://localhost:8080/condutor/alterar/' + id;
    return this.http.put<Condutor>(url, model);
  }

  private delete(id: string): Observable<Condutor> {
    const url = 'http://localhost:8080/condutor/remover/' + id;
    return this.http.delete<Condutor>(url);
  }
}
