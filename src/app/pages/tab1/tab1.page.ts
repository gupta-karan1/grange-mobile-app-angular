import { Component } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

// import module service
import {
  ModuleServiceService,
  Module,
} from '../../services/module-service.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MapFullPage } from '../map-full/map-full.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, MapFullPage],
})
export class Tab1Page implements OnInit {
  // create 2 variables to store results emitted from observable
  modules: any = [];
  newModules: any = [];
  urlModules = environment.urlModules;
  // create a variable to store the selected location
  selectedLocation: string[] = [];
  filteredModules: any = this.modules.modules;

  // inject module service into the constructor
  constructor(
    private moduleService: ModuleServiceService,
    private modalCtrl: ModalController
  ) {}

  // call the getModuleData() method when the page loads
  ngOnInit() {
    // call the getModuleData() method
    this.getModuleData();
  }

  // create a method to get the data from the json-data-modules.php file
  getModuleData() {
    // subscribe to the observable
    // result is the data emitted from the observable
    this.moduleService.getModules().subscribe((result) => {
      // store the data emitted from the observable into the modules variable
      this.modules = result;
      console.log(this.modules);

      // store the data emitted from the observable into the newModules variable
      this.newModules = this.modules.modules;
    });
  }

  // store the url of the images from API in a variable
  urlRandomImages = environment.urlRandomImages;

  // create a method to open modal to view all modules on a map
  async openMapFull() {
    // create a modal
    const modal = await this.modalCtrl.create({
      component: MapFullPage,
      componentProps: {
        // pass the modules array to the modal
        modules: this.newModules,
      },
      breakpoints: [0, 0.75, 1], // set the breakpoints
      initialBreakpoint: 0.75, // set the initial breakpoint
    });
    // present the modal
    return await modal.present();
  }

  get uniqueLocations() {
    const locations = Array.from(
      new Set(this.newModules.map((module: Module) => module.location))
    );
    return locations;
  }
  //   This method uses the map() method to create a new array of all location names in newModules, and then the Set object to remove duplicates. Finally, the Array.from() method is used to convert the Set object back to an array.

  // With this, the dropdown list will now only display each location name once, even if it appears multiple times in the newModules array.

  // filter modules by module location
  filterModulesByLocation(locations: string[]) {
    if (locations.includes('all')) {
      this.filteredModules = this.modules.modules;
    } else {
      this.filteredModules = this.modules.modules.filter((module: Module) => {
        return locations.includes(module.location);
      });
    }
    this.newModules = this.filteredModules;
  }
}
