import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ModuleServiceService,
  Module,
} from 'src/app/services/module-service.service';
import { environment } from 'src/environments/environment';
import { ModalController } from '@ionic/angular';
import { MapPage } from '../map/map.page';

@Component({
  selector: 'app-tab1-details',
  templateUrl: './tab1-details.page.html',
  styleUrls: ['./tab1-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, MapPage],
})
export class Tab1DetailsPage implements OnInit {
  module: Module = {
    moduleNo: '',
    credits: '',
    dueDate: '',
    lat: 0,
    long: 0,
    moduleName: '',
    room: '',
    website: '',
    location: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute, // used to get the moduleNo from the url
    private moduleService: ModuleServiceService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    // get the moduleNo from the url

    //used the parameter map to get the moduleNo from the url
    // the parameter map is a map of the route parameters
    // each detail page will have a different moduleNo and it will be passed in the url
    const moduleNo: any = this.activatedRoute.snapshot.paramMap.get('moduleNo');
    // console.log(moduleNo); // test

    // call the getModuleDetails() method and pass in the moduleNo
    // subscribe to the observable
    // result is the data emitted from the observable
    // store the data emitted from the observable into the module variable
    this.moduleService.getModuleDetails(moduleNo).subscribe((result) => {
      // console.log(result); // test
      this.module = result; // store the data emitted from the observable into the module variable
      // the module variable here is an individual object from the modules array
    });
  }

  // create a method to open the website in a new tab
  openHomePage() {
    window.open(this.module.website, '_blank');
  }

  // store the urlRandomImages variable from the environment.ts file into the urlRandomImages variable
  urlRandomImages = environment.urlRandomImages;

  // create a method to open the map
  async openMap(module: any) {
    //open the map in a modal
    const modal = await this.modalCtrl.create({
      // create a modal
      component: MapPage, // set the modal component
      componentProps: {
        moduleId: module.moduleNo,
        moduleLat: module.lat,
        moduleLong: module.long,
        moduleLocation: module.location,
        moduleRoom: module.room,
      }, // set the modal component properties
      breakpoints: [0, 0.75, 1], // set the breakpoints
      initialBreakpoint: 0.75, // set the initial breakpoint
    }); // create a modal
    modal.present(); // present the modal
  }
}
