import { RodoviaService } from './../service/rodovia.service';
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

@Component({
  selector: 'app-rodovia',
  templateUrl: './rodovia.component.html',
  styleUrls: ['./rodovia.component.scss'],
})
export class RodoviaComponent implements OnInit {
  list: RodoviaModel[] = [];

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

  constructor(
    private formBuilder: FormBuilder,
    private rodoviaService: RodoviaService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.rodoviaService.consultar().subscribe((domains: RodoviaModel[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formRodovia.controls['id'].value;
    const rodoviaModel: RodoviaModel = this.formRodovia.getRawValue();
    if (id) {
      this.rodoviaService
        .alterar(id, rodoviaModel)
        .subscribe((domain: RodoviaModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.formRodovia.reset();
          }
        });
    } else {
      this.rodoviaService
        .cadastrar(rodoviaModel)
        .subscribe((domain: RodoviaModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.formRodovia.reset();
          }
        });
    }
  }

  editar(rodovia: RodoviaModel) {
    this.formRodovia.controls['id'].setValue(rodovia.id);
    this.formRodovia.controls['nome'].setValue(rodovia.nome);
    this.formRodovia.controls['cep'].setValue(rodovia.cep);
    this.formRodovia.controls['mortes'].setValue(rodovia.mortes);
  }

  remover(rodovia: RodoviaModel) {
    const id = this.formRodovia.controls['id'].value;
    this.rodoviaService
      .remover(rodovia.id)
      .subscribe((domain: RodoviaModel) => {
        if (domain.id) {
          this.carregaTabela();
        }
      });
  }
}
