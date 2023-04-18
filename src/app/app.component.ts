import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddStudentPage } from './pages/add-student/add-student.page';
import { UpdateStudentPage } from './pages/update-student/update-student.page';

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
  ],
})
export class AppComponent {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}
}
