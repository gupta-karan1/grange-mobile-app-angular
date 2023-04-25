import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddStudentPage } from '../add-student/add-student.page';
import { RouterLink } from '@angular/router';
import { UpdateStudentPage } from '../update-student/update-student.page';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';

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
    ReactiveFormsModule,
  ],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);

  constructor(
    private loadController: LoadingController,

    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  // for the logout button on the menu page
  async logout() {
    // logout the user
    const loading = await this.loadController.create({
      // create a loading controller
      message: 'Logging out...',
      spinner: 'crescent', // spinner type
      showBackdrop: true,
    });
    await loading.present(); // present the loading controller

    await this.authService.logout(); // logout the user
    await loading.dismiss(); // dismiss the loading controller
    this.router.navigateByUrl('/tabs/login', { replaceUrl: true }); // navigate to the login page
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
