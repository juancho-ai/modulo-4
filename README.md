# Proyecto NativeScript + Angular: Capacidades Nativas, Firebase, Maps, Cámara y Pruebas (Jasmine + Karma)

Aplicación móvil multiplataforma en NativeScript con Angular que integra servicios nativos del dispositivo (Firebase Cloud Messaging, Cámara, Social Share, Google Maps) y automatización de pruebas unitarias con Jasmine y Karma JUnit Reporter.

## Cumplimiento de requerimientos del módulo

1. **Token de Firebase y claves propias de Google**:
   - Configuración propia de Firebase en `App_Resources/Android/google-services.json` y `App_Resources/iOS/GoogleService-Info.plist`.
   - Obtención y visualización del token FCM (`Messaging.getToken()`) en `src/app/firebase-notificaciones/firebase-notificaciones.component.ts` y `.html` para envío de notificaciones desde la consola de Firebase.
2. **Toast mostrando notificaciones entrantes**:
   - Listener `firebase().messaging().onMessage(...)` en `src/app/services/firebase-push.service.ts` y `FirebaseNotificacionesComponent` que despliega un `Toast.makeText(...)` al recibir una notificación push.
3. **Plugin `@nativescript/social-share` para compartir contenido de tipo texto**:
   - Implementado en `src/app/camara-social/camara-social.component.ts` (`SocialShare.shareText(...)`).
4. **Plugin `@nativescript/social-share` para compartir contenido de tipo imagen**:
   - Implementado en `src/app/camara-social/camara-social.component.ts` (`SocialShare.shareImage(...)`).
5. **Plugin `@nativescript/camera` para tomar fotografías con la cámara del dispositivo**:
   - Implementado en `src/app/camara-social/camara-social.component.ts` (`requestCameraPermissions()` + `takePicture()`).
6. **Compartir la imagen capturada por la cámara mediante `social-share`**:
   - La fotografía capturada por `@nativescript/camera` se convierte a `ImageSource` y se comparte directamente con `SocialShare.shareImage(this.imagenCapturada, ...)` en `CamaraSocialComponent`.
7. **Plugin `@nativescript/google-maps` configurado con cuenta propia**:
   - API Key de Google Maps configurada en `App_Resources/Android/src/main/AndroidManifest.xml` (`com.google.android.geo.API_KEY`) y componente `<MapView>` en `src/app/mapa/mapa.component.html`.
8. **Marcador (`Marker`) en el mapa**:
   - Implementado en `src/app/mapa/mapa.component.ts` (`map.addMarker(...)`) al dispararse `(ready)="onMapReady($event)"`.
9. **Suite de tests de Jasmine probando un reducer de Redux**:
   - Ubicada en `src/tests/lectura.reducer.spec.ts` evaluando `lecturaReducer` (`leerAhora`, `quitarDeLeerAhora`, `limpiarLecturas` y estado inicial).
10. **Integración con `karma-junit-reporter` y archivo de salida generado**:
    - Configurado en `karma.conf.js` (`reporters: ['progress', 'junit']`, `junitReporter`) generando el reporte XML en `test-results/junit-test-results.xml`.
