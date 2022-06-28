import { RodoviaComponent } from './rodovia.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RodoviaComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class RodoviaModule {}
