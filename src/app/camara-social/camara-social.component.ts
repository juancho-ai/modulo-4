import { Component } from '@angular/core';
import { Application, ImageSource } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as Camera from '@nativescript/camera';
import * as SocialShare from '@nativescript/social-share';
import * as Toast from 'nativescript-toast';

@Component({
  selector: 'ns-camara-social',
  templateUrl: './camara-social.component.html',
  styleUrls: ['./camara-social.component.css']
})
export class CamaraSocialComponent {
  textoParaCompartir: string = 'Hola desde mi aplicación móvil desarrollada en NativeScript y Angular!';
  imagenCamara: ImageSource | null = null;
  tieneFotoCamara: boolean = false;

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  // Requisito 3: Uso del plugin social-share para compartir contenido de tipo texto
  compartirTexto(): void {
    if (!this.textoParaCompartir || !this.textoParaCompartir.trim()) {
      Toast.makeText('Escribe un texto antes de compartir').show();
      return;
    }
    SocialShare.shareText(this.textoParaCompartir, 'Compartir Texto desde NativeScript');
  }

  // Requisito 5: Uso del plugin camera para tomar fotografías con la cámara del dispositivo
  async tomarFotografia(): Promise<void> {
    try {
      await Camera.requestCameraPermissions();
      const imageAsset = await Camera.takePicture({
        width: 800,
        height: 800,
        keepAspectRatio: true,
        saveToGallery: false
      });

      this.imagenCamara = await ImageSource.fromAsset(imageAsset);
      this.tieneFotoCamara = true;
      Toast.makeText('Fotografía capturada correctamente con la cámara').show();
    } catch (err) {
      Toast.makeText('No se pudo acceder a la cámara o se canceló la captura').show();
    }
  }

  // Requisitos 4 y 6: Compartir imagen (incluida la foto tomada por la cámara) con social-share
  async compartirImagen(): Promise<void> {
    if (this.imagenCamara) {
      SocialShare.shareImage(this.imagenCamara, 'Fotografía capturada desde la cámara');
      return;
    }

    const imagenPorDefecto = await ImageSource.fromResource('ic_catalogo_custom');
    if (imagenPorDefecto) {
      SocialShare.shareImage(imagenPorDefecto, 'Imagen compartida desde NativeScript');
    } else {
      Toast.makeText('Toma primero una fotografía con la cámara para compartirla').show();
    }
  }
}
