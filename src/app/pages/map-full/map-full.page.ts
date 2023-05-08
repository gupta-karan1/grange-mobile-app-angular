import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Input } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-full',
  templateUrl: './map-full.page.html',
  styleUrls: ['./map-full.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MapFullPage implements OnInit {
  @Input() modules!: Array<any>;
  map!: L.Map;

  constructor() {}

  ngOnInit() {}

  ionViewDidEnter() {
    // create a spinner to show while the map is loading
    const spinner = document.createElement('ion-spinner');
    spinner.name = 'crescent';
    spinner.style.cssText = 'position: absolute; top: 10%; left: 50%;';
    document.getElementById('map')?.appendChild(spinner);

    setTimeout(() => {
      // timeout to wait for the modal to load and for the div id called map to be created in the html otherwise the the error appears that 'el' property is undefined
      // for (let i = 0; i < this.modules.length; i++) {
      //   const element = this.modules[i];
      //   console.log(element.lat);
      // }
      // console.log(this.modules[0].lat);

      //dismiss the spinner
      spinner.style.display = 'none';

      //get the first module in the array and use it to set the map view
      this.map = L.map('map').setView(
        [this.modules[0].lat, this.modules[0].long],
        14
      );
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      // create a blue icon for the markers
      const blueIcon = L.icon({
        iconUrl: 'assets/images/marker-icon-2x.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowUrl: 'assets/images/marker-shadow.png',
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });

      // add a marker to the map for each module in the array
      this.modules.forEach((module) => {
        L.marker([module.lat, module.long], { icon: blueIcon })
          .addTo(this.map)
          .bindPopup(
            `${module.moduleName} |  ${module.location} | Room No. ${module.room}`
          )
          .openPopup();
      });

      // zoom map to fit all markers
      this.map.fitBounds(this.map.getBounds());
    }, 500);
  }
}
