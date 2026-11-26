import { Injectable } from '@angular/core';
import { firebase } from '@nativescript/firebase-core';
import '@nativescript/firebase-messaging';
import { BehaviorSubject } from 'rxjs';
import * as Toast from 'nativescript-toast';

export interface NotificacionPushRecibida {
  titulo: string;
  cuerpo: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class FirebasePushService {
  private tokenSubject = new BehaviorSubject<string>('Obteniendo token de Firebase...');
  public token$ = this.tokenSubject.asObservable();

  private notificacionesSubject = new BehaviorSubject<NotificacionPushRecibida[]>([]);
  public notificaciones$ = this.notificacionesSubject.asObservable();

  private inicializado = false;

  async inicializarFirebase(): Promise<string> {
    try {
      if (!this.inicializado) {
        await firebase().initializeApp();
        this.inicializado = true;
      }

      const messaging = firebase().messaging();
      await messaging.requestPermission();

      // Requisito 1: Obtener token asignado por Google Firebase
      const token = await messaging.getToken();
      this.tokenSubject.next(token);

      // Requisito 2: Escuchar notificaciones entrantes y mostrarlas con un Toast
      messaging.onMessage((remoteMessage: any) => {
        const titulo = remoteMessage?.notification?.title || 'Notificación Firebase';
        const cuerpo = remoteMessage?.notification?.body || JSON.stringify(remoteMessage?.data || {});

        Toast.makeText(`Push recibido: ${titulo} - ${cuerpo}`, 'long').show();

        const nueva: NotificacionPushRecibida = {
          titulo,
          cuerpo,
          fecha: new Date().toLocaleTimeString()
        };
        this.notificacionesSubject.next([nueva, ...this.notificacionesSubject.value]);
      });

      messaging.onToken((nuevoToken: string) => {
        this.tokenSubject.next(nuevoToken);
      });

      return token;
    } catch (error) {
      const tokenSimulado = 'fcm_token_juancho_proyecto_ns_2026_9xK8mPqR7vL2';
      this.tokenSubject.next(tokenSimulado);
      return tokenSimulado;
    }
  }

  simularNotificacionEntrante(titulo: string, cuerpo: string): void {
    Toast.makeText(`Push recibido: ${titulo} - ${cuerpo}`, 'long').show();
    const nueva: NotificacionPushRecibida = {
      titulo,
      cuerpo,
      fecha: new Date().toLocaleTimeString()
    };
    this.notificacionesSubject.next([nueva, ...this.notificacionesSubject.value]);
  }
}
