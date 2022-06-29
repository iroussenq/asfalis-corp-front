import { RodoviaService } from './../service/rodovia.service';
import { VeiculoService } from './../service/veiculo.service';
import { PolicialService } from './../service/policial.service';
import { CondutorService } from './../service/condutor.service';
import { AcidenteService } from './../service/acidente.service';
import { Rodovia } from './../domain/rodovia';
import { Veiculo } from './../domain/veiculo';
import { Policial } from './../domain/policial';
import { Condutor } from './../domain/condutor';
import { Acidente } from './../domain/acidente';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-acidente',
  templateUrl: './acidente.component.html',
  styleUrls: ['./acidente.component.scss'],
})
export class AcidenteComponent implements OnInit {
  acidentes: Acidente[] = [];
  condutores: Condutor[] = [];
  policiais: Policial[] = [];
  rodovias: Rodovia[] = [];
  veiculos: Veiculo[] = [];

  formAcidente: FormGroup = this.formBuilder.group({
    id: new FormControl(null),
    idCondutor: new FormControl('', [Validators.required]),
    idPolicial: new FormControl('', [Validators.required]),
    idRodovia: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required]),
    dataDoAcidente: new FormControl(null, [Validators.required]),
    relatorio: new FormControl(null, [Validators.required]),
    casualidades: new FormControl(null, [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private acidenteService: AcidenteService,
    private condutorService: CondutorService,
    private policialService: PolicialService,
    private veiculoService: VeiculoService,
    private rodoviaService: RodoviaService
  ) {}

  ngOnInit(): void {
    this.consultarAcidentes();
    this.consultarCondutores();
    this.consultarPoliciais();
    this.consultarRodovias();
    this.consultarVeiculos();
  }

  private consultarAcidentes(): void {
    this.acidenteService.consultar().subscribe((x) => {
      this.acidentes = x;
    });
  }

  private consultarCondutores(): void {
    this.condutorService.consultar().subscribe((x) => {
      this.condutores = x;
    });
  }

  private consultarPoliciais(): void {
    this.policialService.consultar().subscribe((x) => {
      this.policiais = x;
    });
  }

  private consultarRodovias(): void {
    this.rodoviaService.consultar().subscribe((x) => {
      this.rodovias = x;
    });
  }

  private consultarVeiculos(): void {
    this.veiculoService.consultar().subscribe((x) => {
      this.veiculos = x;
    });
  }

  cadastrar(): void {
    if (this.formAcidente.valid) {
      const idCondutor = this.formAcidente.controls['idCondutor'].value;
      const idPolicial = this.formAcidente.controls['idPolicial'].value;
      const idRodovia = this.formAcidente.controls['idRodovia'].value;
      const idVeiculo = this.formAcidente.controls['idVeiculo'].value;
      const dataDoAcidente = this.formAcidente.controls['dataDoAcidente'].value;
      const relatorio = this.formAcidente.controls['relatorio'].value;
      const casualidades = this.formAcidente.controls['casualidades'].value;

      this.acidenteService
        .cadastrar(
          idCondutor,
          idPolicial,
          idRodovia,
          idVeiculo,
          dataDoAcidente,
          relatorio,
          casualidades
        )
        .subscribe((acidente: Acidente) => {
          this.acidentes.push(acidente);
          this.resetForm();
        });
    }
  }

  remover(acidente: Acidente): void {
    this.acidenteService
      .remover(acidente.id)
      .subscribe((acidente: Acidente) => {
        if (acidente.id) {
          this.ngOnInit();
        }
      });
  }

  resetForm(): void {
    this.formAcidente.reset();
    this.formAcidente.controls['idCondutor'].setValue('');
    this.formAcidente.controls['idPolicial'].setValue('');
    this.formAcidente.controls['idRodovia'].setValue('');
    this.formAcidente.controls['idVeiculo'].setValue('');
    this.formAcidente.controls['dataDoAcidente'].setValue('');
    this.formAcidente.controls['relatorio'].setValue('');
    this.formAcidente.controls['casualidades'].setValue('');
  }
}
