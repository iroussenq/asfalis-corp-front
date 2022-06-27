import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VeiculoComponent } from './veiculo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    VeiculoComponent
  ],
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class VeiculoModule { }
