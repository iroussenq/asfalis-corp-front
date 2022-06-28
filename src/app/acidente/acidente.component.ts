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
    idProduto: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private acidenteService: Acidentes,
    private clienteService: ClienteService,
    private farmaceuticoService: FarmaceuticoService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.consultarPedidos();
    this.consultarClientes();
    this.consultarFarmaceuticos();
    this.consultarProdutos();
  }

  private consultarPedidos(): void {
    this.pedidoService.consultar().subscribe((x) => {
      this.pedidos = x;
    });
  }

  private consultarClientes(): void {
    this.clienteService.consultar().subscribe((x) => {
      this.clientes = x;
    });
  }

  private consultarFarmaceuticos(): void {
    this.farmaceuticoService.consultar().subscribe((x) => {
      this.farmaceuticos = x;
    });
  }

  private consultarProdutos(): void {
    this.produtoService.consultar().subscribe((x) => {
      this.produtos = x;
    });
  }

  cadastrar(): void {
    if (this.form.valid) {
      const idCliente = this.form.controls['idCliente'].value;
      const idFarmaceutico = this.form.controls['idFarmaceutico'].value;
      this.pedidoService
        .cadastrar(idCliente, idFarmaceutico)
        .subscribe((pedido: Pedido) => {
          this.pedidos.push(pedido);
          this.resetForm();
        });
    }
  }

  clickAddProduto(pedido: Pedido) {
    this.formAddProduto.controls['idPedido'].setValue(pedido.id);
  }

  addProduto(): void {
    if (this.formAddProduto.valid) {
      const idPedido = this.formAddProduto.controls['idPedido'].value;
      const idProduto = this.formAddProduto.controls['idProduto'].value;
      this.pedidoService.adicionarProduto(idPedido, idProduto).subscribe(() => {
        this.consultarPedidos();
        this.resetForm();
      });
    }
  }

  resetForm(): void {
    this.form.reset();
    this.form.controls['idCliente'].setValue('');
    this.form.controls['idFarmaceutico'].setValue('');

    this.formAddProduto.reset();
    this.formAddProduto.controls['idProduto'].setValue('');
  }
}
