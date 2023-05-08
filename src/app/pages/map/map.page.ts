import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Input } from '@angular/core';
import * as L from 'leaflet';
import { Module } from 'src/app/services/module-service.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MapPage implements OnInit {
  module!: Module; // module object
  @Input() moduleId!: string; // id of the module taken from the modal component props
  @Input() moduleLat!: number; // latitude of the module taken from the modal component props
  @Input() moduleLong!: number; // longitude of the module taken from the modal component props
  @Input() moduleLocation!: string; // location of the module taken from the modal component props
  @Input() moduleRoom!: string; // room of the module taken from the modal component props

  map!: L.Map;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // this is a lifecycle hook that is called when the view is loaded into the DOM and ready to be presented to the user
    // create a spinner to show while the map is loading
    const spinner = document.createElement('ion-spinner');
    spinner.name = 'crescent';
    spinner.style.cssText = 'position: absolute; top: 10%; left: 50%;';
    document.getElementById('map')?.appendChild(spinner);

    setTimeout(() => {
      //dismiss the spinner
      spinner.style.display = 'none';

      // timeout to wait for the modal to load and for the div id called map to be created in the html otherwise the the error appears that 'el' property is undefined

      this.map = L.map('map').setView([this.moduleLat, this.moduleLong], 16);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      const blueIcon = L.icon({
        iconUrl: 'assets/images/marker-icon-2x.png', //remember to shift the images folder from the node_modules/leaflet/dist/images to the src/assets/images folder otherwise the images will not be found
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: 'assets/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });

      // add a marker to the map
      L.marker([this.moduleLat, this.moduleLong], { icon: blueIcon })
        .addTo(this.map)
        .bindPopup(this.moduleLocation + ' | Room No. ' + this.moduleRoom)
        .openPopup();

      // add a circle to the map
      L.circle([this.moduleLat, this.moduleLong], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 50,
      }).addTo(this.map);
    }, 500);
  }
}
