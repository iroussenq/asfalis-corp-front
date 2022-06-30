import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CondutorComponent } from './condutor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [CondutorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
})
export class CondutorModule {}
