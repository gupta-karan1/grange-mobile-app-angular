import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterLink, Route } from '@angular/router';
import { environment } from 'src/environments/environment';

import { ProfileDataService } from 'src/app/services/profile-data.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class Tab4Page implements OnInit {
  // inject the ProfileDataService
  constructor(private profileDataService: ProfileDataService) {}

  ngOnInit() {}
  urlRandomImages = environment.urlRandomImages;
}
