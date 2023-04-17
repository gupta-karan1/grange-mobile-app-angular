import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
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
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class Tab1Page implements OnInit {
  // create 2 variables to store results emitted from observable
  modules: any = [];
  newModules: any = [];
  urlModules = environment.urlModules;

  // inject module service into the constructor
  constructor(
    private moduleService: ModuleServiceService,
    private route: Router
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

  urlRandomImages = environment.urlRandomImages;
}
