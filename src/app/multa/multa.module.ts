import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultaComponent } from './multa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MultaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class MultaModule {}
