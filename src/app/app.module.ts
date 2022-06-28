import { AcidenteModule } from './acidente/acidente.module';
import { VeiculoModule } from './veiculo/veiculo.module';
import { RodoviaModule } from './rodovia/rodovia.module';
import { MultaModule } from './multa/multa.module';
import { PolicialModule } from './policial/policial.module';
import { CondutorModule } from './condutor/condutor.module';
import { MenuModule } from './menu/menu.module';
import { SobreModule } from './sobre/sobre.module';
import { HomeModule } from './home/home.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    SobreModule,
    MenuModule,
    CondutorModule,
    PolicialModule,
    MultaModule,
    RodoviaModule,
    VeiculoModule
    AcidenteModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
