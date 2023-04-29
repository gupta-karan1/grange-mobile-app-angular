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
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { DiaryTaskModalPage } from './pages/diary-task-modal/diary-task-modal.page';
import { CalModalPage } from './pages/cal-modal/cal-modal.page';
import { CalUpdateModalPage } from './pages/cal-update-modal/cal-update-modal.page';

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
    RouterLink,
    DiaryTaskModalPage,
    CalModalPage,
    CalUpdateModalPage,
  ],
})
export class AppComponent {
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
    this.router.navigateByUrl('/login', { replaceUrl: true }); // navigate to the login page
    const toast = await this.toastCtrl.create({
      message: 'You have been logged out',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }

  // function to switch the theme
  onToggleColorTheme(event: any) {
    // console.log(event.detail.checked);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else {
      document.body.setAttribute('color-theme', 'light');
    }

    // save the theme to local storage
    localStorage.setItem(
      'color-theme',
      document.body.getAttribute('color-theme')!
    );
  }
}
