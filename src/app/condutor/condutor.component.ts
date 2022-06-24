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
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    statusCondutor: new FormControl(null, [Validators.required]),
    niver: new FormControl(null, [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Condutor[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const condutorModel: CondutorModel = this.formCondutor.getRawValue();
    this.post(condutorModel).subscribe((domain: Condutor) => {
      if (domain.id) {
        this.list.push(domain);
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
}
