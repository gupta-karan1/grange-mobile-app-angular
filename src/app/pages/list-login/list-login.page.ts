import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  AlertController,
  ToastController,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { SupabaseService } from 'src/app/services/supabase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-login',
  templateUrl: './list-login.page.html',
  styleUrls: ['./list-login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ListLoginPage implements OnInit {
  credentials!: FormGroup;

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async supabaseLogin() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.supabaseService
      .signIn(this.credentials.value)
      .then((res) => {
        loading.dismiss();
        //show login success
        this.showError('Login Successful', 'Welcome back!');

        //create a toast message to show login success
        this.toastController
          .create({
            message: 'Login Successful',
            duration: 2000,
          })
          .then((toast) => toast.present());

        this.router.navigateByUrl('/tabs/list', { replaceUrl: true }); //navigate to achievement list page
        // this.router.navigateByUrl('/list');
      })
      .catch((err) => {
        loading.dismiss();
        this.showError('Login Failed', err.message);
      });
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.supabaseService
      .signUp(this.credentials.value)
      .then((res) => {
        loading.dismiss();
        this.showError('Sign up successful', 'Please Confirm your email');
        // this.router.navigateByUrl('/list', { replaceUrl: true });
      })
      .catch((err) => {
        loading.dismiss();
        const alert = this.alertController.create({
          header: 'Sign up failed',
          message: err.message,
          buttons: ['OK'],
        });
        alert.then((alert) => alert.present());
      });
  }

  async showError(title: string, msg: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
