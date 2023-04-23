import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddStudentPage } from './pages/add-student/add-student.page';
import { UpdateStudentPage } from './pages/update-student/update-student.page';
import { DiaryModalPage } from './pages/diary-modal/diary-modal.page';
import { MapFullPage } from './pages/map-full/map-full.page';
import { MapPage } from './pages/map/map.page';
import { LoginPage } from './pages/login/login.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddStudentPage,
    UpdateStudentPage,
    DiaryModalPage,
    MapFullPage,
    MapPage,
    LoginPage,
  ],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}
}
