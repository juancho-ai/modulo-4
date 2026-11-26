import { Component, OnInit } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { Observable } from 'rxjs';
import * as SocialShare from '@nativescript/social-share';
import { FirebasePushService, NotificacionPushRecibida } from '../services/firebase-push.service';

@Component({
  selector: 'ns-firebase-notificaciones',
  templateUrl: './firebase-notificaciones.component.html',
  styleUrls: ['./firebase-notificaciones.component.css']
})
export class FirebaseNotificacionesComponent implements OnInit {
  tokenFirebase$: Observable<string>;
  notificaciones$: Observable<NotificacionPushRecibida[]>;
  tokenActual: string = '';

  constructor(private firebasePushService: FirebasePushService) {
    this.tokenFirebase$ = this.firebasePushService.token$;
    this.notificaciones$ = this.firebasePushService.notificaciones$;
  }

  ngOnInit(): void {
    this.firebasePushService.inicializarFirebase().then((t) => {
      this.tokenActual = t;
    });
  }

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  copiarOCompartirToken(): void {
    if (this.tokenActual) {
      SocialShare.shareText(this.tokenActual, 'Token FCM de Firebase');
    }
  }

  probarToastNotificacion(): void {
    this.firebasePushService.simularNotificacionEntrante(
      'Alerta desde Firebase Console',
      'Notificación recibida correctamente en el dispositivo.'
    );
  }
}
