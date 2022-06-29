import { AcidenteComponent } from './acidente/acidente.component';
import { VeiculoComponent } from './veiculo/veiculo.component';
import { RodoviaComponent } from './rodovia/rodovia.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondutorComponent } from './condutor/condutor.component';
import { HomeComponent } from './home/home.component';
import { PolicialComponent } from './policial/policial.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'acidente', component: AcidenteComponent },
  { path: 'condutor', component: CondutorComponent },
  { path: 'policial', component: PolicialComponent },
  { path: 'veiculo', component: VeiculoComponent },
  { path: 'rodovia', component: RodoviaComponent },
  { path: 'informacoes-legais', component: SobreComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
