import { MultaModel } from './../model/multa-model';
import { MultaService } from './../service/multa.service';
import { Multa } from './../domain/multa';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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

  constructor(
    private formBuilder: FormBuilder,
    private multaService: MultaService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.multaService.consultar().subscribe((domains: Multa[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formMulta.controls['id'].value;
    const model: MultaModel = this.formMulta.getRawValue();
    if (id) {
      this.multaService.alterar(id, model).subscribe((domain: Multa) => {
        if (domain.id) {
          this.carregaTabela();
          this.formMulta.reset();
        }
      });
    } else {
      this.multaService.cadastrar(model).subscribe((domain: Multa) => {
        if (domain.id) {
          this.list.push(domain);
          this.formMulta.reset();
        }
      });
    }
  }

  editar(multa: Multa): void {
    this.formMulta.controls['id'].setValue(multa.id);
    this.formMulta.controls['condicaoDaMulta'].setValue(multa.condicaoDaMulta);
    this.formMulta.controls['valorDaMulta'].setValue(multa.valorDaMulta);
  }

  remover(multa: Multa): void {
    this.multaService.remover(multa.id).subscribe((m: Multa) => {
      if (m.id) {
        this.carregaTabela();
      }
    });
  }
}
