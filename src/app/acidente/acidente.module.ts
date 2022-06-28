import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcidenteComponent } from './acidente.component';

@NgModule({
  declarations: [AcidenteComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class AcidenteModule {}
