import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from '@nativescript/angular';
import { FirebaseNotificacionesRoutingModule } from './firebase-notificaciones-routing.module';
import { FirebaseNotificacionesComponent } from './firebase-notificaciones.component';

@NgModule({
  imports: [NativeScriptCommonModule, FirebaseNotificacionesRoutingModule],
  declarations: [FirebaseNotificacionesComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class FirebaseNotificacionesModule {}
