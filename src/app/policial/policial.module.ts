import { PolicialComponent } from './policial.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [PolicialComponent],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,HttpClientModule]
})
export class PolicialModule { }
