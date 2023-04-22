import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {}

  public get email() {
    return this.credentials.get('email');
  }

  public get password() {
    return this.credentials.get('password');
  }

  ngOnInit() {
    // create a form group for the login form
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // email field
      password: ['', [Validators.required, Validators.minLength(6)]], // password field
    });
  }

  async register() {
    // register the user
    const loading = await this.loadController.create({
      // create a loading controller
      message: 'Registering...',
      spinner: 'crescent', // spinner type
      showBackdrop: true,
    });
    await loading.present(); // present the loading controller

    const user = await this.authService.register(this.credentials.value); // register the user
    await loading.dismiss(); // dismiss the loading controller

    if (user) {
      // if the user is registered, navigate to the profile page
      this.router.navigateByUrl('/tabs/tab4', { replaceUrl: true });

      const toast = await this.toastCtrl.create({
        message: 'Registration Successful. Welcome to Your Profile Page!',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    } else {
      // if the user is not registered, show an alert message to the user to try again
      const alert = await this.alertController.create({
        header: 'Sorry, Registration Failed',
        message:
          'Please try again. Please note that you can only register with a valid email address and password. If you have already registered, please login.',
        buttons: ['OK'],
      });
      await alert.present(); // present the alert message
    }
  }

  async login() {
    // login the user
    const loading = await this.loadController.create({
      // create a loading controller
      message: 'Logging in...',
      spinner: 'crescent', // spinner type
      showBackdrop: true,
    });
    await loading.present(); // present the loading controller

    const user = await this.authService.login(this.credentials.value); // login the user
    await loading.dismiss(); // dismiss the loading controller

    if (user) {
      // if the user is logged in, navigate to the profile page
      this.router.navigateByUrl('/tabs/tab4', { replaceUrl: true });

      const toast = await this.toastCtrl.create({
        message: 'Login Successful. Welcome to Your Profile Page!',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    } else {
      // if the user is not logged in, show an alert message to the user to try again
      const alert = await this.alertController.create({
        header: 'Sorry, Login Failed',
        message:
          'Please try again. If you are not registered, please register first. Please note that you can only register with a valid email address and password. ',
        buttons: ['OK'],
      });
      await alert.present(); // present the alert message
    }
  }
}
