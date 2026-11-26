import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';

const routes: Routes = [
  { path: '', redirectTo: '/firebase', pathMatch: 'full' },
  {
    path: 'firebase',
    loadChildren: () =>
      import('~/app/firebase-notificaciones/firebase-notificaciones.module').then(
        (m) => m.FirebaseNotificacionesModule
      )
  },
  {
    path: 'camara-social',
    loadChildren: () =>
      import('~/app/camara-social/camara-social.module').then((m) => m.CamaraSocialModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('~/app/mapa/mapa.module').then((m) => m.MapaModule)
  }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
