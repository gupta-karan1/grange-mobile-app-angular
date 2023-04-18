import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddStudentPage } from '../add-student/add-student.page';
import { RouterLink } from '@angular/router';
import { UpdateStudentPage } from '../update-student/update-student.page';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    FormsModule,
    CommonModule,
    AddStudentPage,
    RouterLink,
    UpdateStudentPage,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}
}
