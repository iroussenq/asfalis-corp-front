import { VeiculoService } from './../service/veiculo.service';
import { VeiculoModel } from './../model/veiculo-model';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-veiculo',
  templateUrl: './veiculo.component.html',
  styleUrls: ['./veiculo.component.scss'],
})
export class VeiculoComponent implements OnInit {
  list: VeiculoModel[] = [];

  formVeiculo: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    nome: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    placa: new FormControl(null, [
      Validators.required,
      Validators.minLength(7),
      Validators.pattern(/[A-Z]{3}[0-9][0-9A-Z][0-9]{2}/),
    ]),
    ano: new FormControl(null, [Validators.required, Validators.minLength(4)]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private veiculoService: VeiculoService
  ) {}

  ngOnInit(): void {
    this.carregaTabela();
  }

  private carregaTabela(): void {
    this.veiculoService.consultar().subscribe((domains: VeiculoModel[]) => {
      this.list = domains;
    });
  }

  cadastrar(): void {
    const id = this.formVeiculo.controls['id'].value;
    const veiculoModel: VeiculoModel = this.formVeiculo.getRawValue();
    if (id) {
      this.veiculoService
        .alterar(id, veiculoModel)
        .subscribe((domain: VeiculoModel) => {
          if (domain.id) {
            this.carregaTabela();
            this.formVeiculo.reset();
          }
        });
    } else {
      this.veiculoService
        .cadastrar(veiculoModel)
        .subscribe((domain: VeiculoModel) => {
          if (domain.id) {
            this.list.push(domain);
            this.formVeiculo.reset();
          }
        });
    }
  }

  editar(veiculo: VeiculoModel) {
    this.formVeiculo.controls['id'].setValue(veiculo.id);
    this.formVeiculo.controls['nome'].setValue(veiculo.nome);
    this.formVeiculo.controls['placa'].setValue(veiculo.placa);
    this.formVeiculo.controls['ano'].setValue(veiculo.ano);
  }

  remover(veiculo: VeiculoModel) {
    const id = this.formVeiculo.controls['id'].value;
    this.veiculoService
      .remover(veiculo.id)
      .subscribe((domain: VeiculoModel) => {
        if (domain.id) {
          this.carregaTabela();
        }
      });
  }
}
