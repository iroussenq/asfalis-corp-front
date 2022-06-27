import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultaComponent } from './multa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    MultaComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class MultaModule { }
