import { Component } from '@angular/core';
import { Application } from '@nativescript/core';
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import { GoogleMap, MapReadyEvent, Marker } from '@nativescript/google-maps';
import * as Toast from 'nativescript-toast';

@Component({
  selector: 'ns-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  latitud: number = 6.2442;
  longitud: number = -75.5812;
  zoom: number = 14;
  private mapa: GoogleMap;

  onDrawerButtonTap(): void {
    const sideDrawer = <RadSideDrawer>Application.getRootView();
    sideDrawer.showDrawer();
  }

  // Requisitos 7 y 8: Inicialización de Google Maps con cuenta propia y agregado de Marker
  onMapReady(event: MapReadyEvent): void {
    this.mapa = event.map;

    const marcador: Marker = this.mapa.addMarker({
      position: {
        lat: this.latitud,
        lng: this.longitud
      },
      title: 'Medellín - Ubicación del Proyecto',
      snippet: 'Marcador configurado con @nativescript/google-maps',
      draggable: true
    });

    Toast.makeText(`Mapa listo y marcador agregado: ${marcador.title}`).show();
  }
}
