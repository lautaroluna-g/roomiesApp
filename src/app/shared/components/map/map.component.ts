import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Map, MapStyle, Marker, config } from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';

import { environments } from '../../../../environments/environments';

@Component({
  selector: 'shared-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {

  map: Map | undefined;

  @ViewChild('map')
  private mapContainer?: ElementRef<HTMLElement>;

  ngOnInit(): void {
    config.apiKey = environments.api_map_key;
  }
  ngAfterViewInit(): void {

    if (!this.mapContainer) throw 'El elemento HTML no fue encontrado'
    const initialState = { lng: -57.535503, lat: -38.011008, zoom: 15 };

    this.map = new Map({
      container: this.mapContainer.nativeElement,
      style: MapStyle.STREETS.PASTEL,
      terrainControl: true,
      geolocateControl: true,
      center: [initialState.lng, initialState.lat],
      zoom: initialState.zoom
    });

    new Marker({ color: "#FF0000" })
      .setLngLat([-57.535503, -38.011008])
      .addTo(this.map);
  }
  ngOnDestroy(): void {
    this.map?.remove();
  }

}