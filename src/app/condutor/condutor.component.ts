import { CondutorService } from './../service/condutor.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { CondutorModel } from '../model/condutor-model';

@Component({
  selector: 'app-condutor',
  templateUrl: './condutor.component.html',
  styleUrls: ['./condutor.component.scss'],
})
export class CondutorComponent implements OnInit {
  list: CondutorModel[] = [];

  formCondutor: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    statusCondutor: new FormControl(null, [Validators.required]),
    dataDeNascimento: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private condutorService: CondutorService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.condutorService.consultar().subscribe((domains: CondutorModel[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formCondutor.controls['id'].value;
    const condutorModel: CondutorModel = this.formCondutor.getRawValue();
    if (id) {
      this.condutorService
        .alterar(id, condutorModel)
        .subscribe((domain: CondutorModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.formCondutor.reset();
          }
        });
    } else {
      this.condutorService
        .cadastrar(condutorModel)
        .subscribe((domain: CondutorModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.formCondutor.reset();
          }
        });
    }
  }

  editar(condutor: CondutorModel): void {
    this.formCondutor.controls['id'].setValue(condutor.id);
    this.formCondutor.controls['nome'].setValue(condutor.nome);
    this.formCondutor.controls['cpf'].setValue(condutor.cpf);
    this.formCondutor.controls['statusCondutor'].setValue(
      condutor.statusCondutor
    );
    this.formCondutor.controls['dataDeNascimento'].setValue(
      condutor.dataDeNascimento
    );
  }

  remover(condutor: CondutorModel): void {
    this.condutorService
      .remover(condutor.id)
      .subscribe((condutor: CondutorModel) => {
        if (condutor.id) {
          this.carregaTabela();
        }
      });
  }
}
