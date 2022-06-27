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
    condicaoDaMulta: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    valorDaMulta: new FormControl(null, [Validators.required])
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.get().subscribe((domains: Multa[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const multaModel: MultaModel = this.formMulta.getRawValue();
    this.post(multaModel).subscribe((domain: Multa) => {
      if (domain.id) {
        this.list.push(domain);
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
}
