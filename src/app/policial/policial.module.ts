import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PolicialComponent } from './policial.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [PolicialComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class PolicialModule {}
