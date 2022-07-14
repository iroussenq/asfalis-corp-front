import { PolicialService } from './../service/policial.service';
import { PolicialModel } from './../model/policial-model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-policial',
  templateUrl: './policial.component.html',
  styleUrls: ['./policial.component.scss'],
})
export class PolicialComponent implements OnInit {
  list: PolicialModel[] = [];

  formPolicial: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    cpf: new FormControl(null, [Validators.required, Validators.minLength(11)]),
    patente: new FormControl(null, [Validators.required]),
    dataDeNascimento: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private policialService: PolicialService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.policialService.consultar().subscribe((domains: PolicialModel[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formPolicial.controls['id'].value;
    const policialModel: PolicialModel = this.formPolicial.getRawValue();
    if (id) {
      this.policialService
        .alterar(id, policialModel)
        .subscribe((domain: PolicialModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.formPolicial.reset();
          }
        });
    } else {
      this.policialService
        .cadastrar(policialModel)
        .subscribe((domain: PolicialModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.formPolicial.reset();
          }
        });
    }
  }

  editar(policial: PolicialModel): void {
    this.formPolicial.controls['id'].setValue(policial.id);
    this.formPolicial.controls['nome'].setValue(policial.nome);
    this.formPolicial.controls['cpf'].setValue(policial.cpf);
    this.formPolicial.controls['patente'].setValue(policial.patente);
    this.formPolicial.controls['dataDeNascimento'].setValue(
      policial.dataDeNascimento
    );
  }

  remover(policial: PolicialModel): void {
    this.policialService
      .remover(policial.id)
      .subscribe((policial: PolicialModel) => {
        if (policial.id) {
          this.carregaTabela();
        }
      });
  }
}
