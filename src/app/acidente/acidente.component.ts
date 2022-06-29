import { MultaService } from './../service/multa.service';
import { RodoviaService } from './../service/rodovia.service';
import { VeiculoService } from './../service/veiculo.service';
import { PolicialService } from './../service/policial.service';
import { CondutorService } from './../service/condutor.service';
import { AcidenteService } from './../service/acidente.service';
import { Multa } from './../domain/multa';
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
  multas: Multa[] = [];

  formAcidente: FormGroup = this.formBuilder.group({
    idCondutor: new FormControl('', [Validators.required]),
    idPolicial: new FormControl('', [Validators.required]),
    idRodovia: new FormControl('', [Validators.required]),
    idVeiculo: new FormControl('', [Validators.required]),
  });

  formAddMulta: FormGroup = this.formBuilder.group({
    idAcidente: new FormControl('', [Validators.required]),
    idMulta: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private acidenteService: AcidenteService,
    private condutorService: CondutorService,
    private policialService: PolicialService,
    private veiculoService: VeiculoService,
    private rodoviaService: RodoviaService,
    private multaService: MultaService
  ) {}

  ngOnInit(): void {
    this.consultarAcidentes();
    this.consultarCondutores();
    this.consultarPoliciais();
    this.consultarRodovias();
    this.consultarVeiculos();
    this.consultarMultas();
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

  private consultarMultas(): void {
    this.multaService.consultar().subscribe((x) => {
      this.multas = x;
    });
  }

  cadastrar(): void {
    if (this.formAcidente.valid) {
      const idCondutor = this.formAcidente.controls['idCliente'].value;
      const idPolicial = this.formAcidente.controls['idPolicial'].value;
      const idRodovia = this.formAcidente.controls['idRodovia'].value;
      const idVeiculo = this.formAcidente.controls['idVeiculo'].value;
      this.acidenteService
        .cadastrar(idCondutor, idPolicial,idRodovia,idVeiculo)
        .subscribe((acidente: Acidente) => {
          this.acidentes.push(acidente);
          this.resetForm();
        });
    }
  }

  clickAddMulta(acidente: Acidente) {
    this.formAddMulta.controls['idAcidente'].setValue(acidente.id);
  }

  addMultas(): void {
    if (this.formAddMulta.valid) {
      const idAcidente = this.formAddMulta.controls['idAcidente'].value;
      const idMulta = this.formAddMulta.controls['idAcidente'].value;
      this.acidenteService.adicionarMulta(idAcidente, idMulta).subscribe(() => {
        this.consultarAcidentes();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.formAcidente.reset();
    this.formAcidente.controls['idCondutor'].setValue('');
    this.formAcidente.controls['idPolicial'].setValue('');
    this.formAcidente.controls['idRodovia'].setValue('');
    this.formAcidente.controls['idVeiculo'].setValue('');

    this.formAddMulta.reset();
    this.formAddMulta.controls['idMulta'].setValue('');
  }
}
