import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { GoogleMapsModule } from '@nativescript/google-maps/angular';
import { MapaRoutingModule } from './mapa-routing.module';
import { MapaComponent } from './mapa.component';

@NgModule({
  imports: [
    NativeScriptCommonModule,
    GoogleMapsModule,
    MapaRoutingModule
  ],
  declarations: [MapaComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class MapaModule {}
