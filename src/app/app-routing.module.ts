import { VeiculoComponent } from './veiculo/veiculo.component';
import { MultaComponent } from './multa/multa.component';
import { RodoviaComponent } from './rodovia/rodovia.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CondutorComponent } from './condutor/condutor.component';
import { HomeComponent } from './home/home.component';
import { PolicialComponent } from './policial/policial.component';
import { SobreComponent } from './sobre/sobre.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'informacoes-legais', component: SobreComponent },
  { path: 'condutor', component: CondutorComponent },
  { path: 'policial', component: PolicialComponent },
  { path: 'rodovia', component: RodoviaComponent },
  { path: 'multa', component: MultaComponent },
  { path: 'veiculo', component: VeiculoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
