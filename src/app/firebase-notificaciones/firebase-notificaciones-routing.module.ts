import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { FirebaseNotificacionesComponent } from './firebase-notificaciones.component';

const routes: Routes = [{ path: '', component: FirebaseNotificacionesComponent }];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule]
})
export class FirebaseNotificacionesRoutingModule {}
