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
      nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
      cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
      patente: new FormControl(null, [Validators.required]),
      dataDeNascimento: new FormControl(null, [Validators.required]),
    });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Policial[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const policialModel: PolicialModel = this.formPolicial.getRawValue();
    this.post(policialModel).subscribe((domain: Policial) => {
      if (domain.id) {
        this.list.push(domain);
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
}
