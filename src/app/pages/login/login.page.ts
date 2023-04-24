import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, isPlatform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import '@codetrix-studio/capacitor-google-auth';
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { FacebookAuthProvider } from '@angular/fire/auth';
import {
  FacebookLogin,
  FacebookLoginResponse,
} from '@capacitor-community/facebook-login';
import { HttpClient } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPage implements OnInit {
  credentials!: FormGroup; // form group for the login form fields (email and password)
  googleUser: any = null; // the google user object that will be returned from the google auth plugin

  // fbLogin!: FacebookLoginPlugin; // facebook login plugin
  fbLogin!: FacebookLoginResponse;
  fbUser: any = null; // the facebook user object that will be returned from the facebook login plugin
  token: any; // the facebook token that will be returned from the facebook login plugin

  provider = new FacebookAuthProvider();
  // auth = getAuth();

  constructor(
    private fb: FormBuilder,
    private loadController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    //initialize the google auth plugin
    if (!isPlatform('capacitor')) {
      // if the platform is not capacitor
      GoogleAuth.initialize({
        // initialize the google auth plugin
        // client id
        //? Important: I had to create a new client id separate from the auto-generated one that comes from firestore and embed that within firestore whitelist as well as the google api console because the localhost:8100 was not being recognized as a valid origin
        clientId:
          '446380689792-1epieubs0ehbls3rsvab4kvbpqccgfpv.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });
    }
    GoogleAuth.initialize({
      // initialize the google auth plugin
      // client id
      clientId:
        '446380689792-1epieubs0ehbls3rsvab4kvbpqccgfpv.apps.googleusercontent.com',
      scopes: ['profile', 'email'], // scopes defined in the google api console
    });

    //initialize the facebook login plugin
    // this.setupFbLogin();

    // this.setupFacebookLogin();
    FacebookLogin.initialize({
      appId: '6367860876570694',
    });

    // this.provider.addScope('email');
    // this.provider.addScope('user_birthday');
    // this.provider.setCustomParameters({
    //   display: 'popup',
    // });
    // this.auth.useDeviceLanguage();
  }

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

    // const checkGoogleUser = await this.googleLogin(); // check if the user is logged in with google
    // console.log('outside checkGoogleUser', checkGoogleUser);

    if (user) {
      // console.log('inside user', checkGoogleUser);
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

  async googleLogin(): Promise<any> {
    this.googleUser = await GoogleAuth.signIn(); // sign in with google
    // console.log('user', this.googleUser, this.googleUser.email); // log the user object to the console

    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed in with Google.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();

    return this.googleUser;
  }

  async googleSignOut() {
    await GoogleAuth.signOut(); // sign out of google
    this.googleUser = null; // set the google user to null
    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed out of Google.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  async googleRefresh() {
    const authCode = await GoogleAuth.refresh(); // refresh the google auth code
    console.log('authCode', authCode); // log the auth code to the console
  }

  // async setupFbLogin() {
  //   if (isPlatform('pwa')) {
  //     //try changing the platform to see if it works
  //     this.fbLogin = FacebookLogin;
  //   } else {
  //     // const { FacebookLogin } = Plugins;
  //     this.fbLogin = FacebookLogin;
  //     //for native implementation
  //   }
  // }

  async facebookLogin() {
    const FACEBOOK_PERMISSIONS = [
      'email',
      'user_birthday',
      'user_photos',
      'user_gender',
    ];

    const result = await FacebookLogin.login({
      permissions: FACEBOOK_PERMISSIONS,
    });

    console.log('result', result);
    if (result.accessToken) {
      // Login successful.
      console.log(`Facebook access token is ${result.accessToken.token}`);
      this.getCurrentAccessToken();
      // this.getCurrentUserProfile();
    }
  }

  async getCurrentAccessToken() {
    const result = await FacebookLogin.getCurrentAccessToken();
    if (result.accessToken) {
      console.log(`Facebook access token is ${result.accessToken.token}`);
      this.token = result.accessToken.token;
      this.getCurrentUserProfile();
    }
  }

  async getCurrentUserProfile() {
    const result = await FacebookLogin.getProfile<{
      email: string;
      name: string;
      picture: { data: { url: string } };
      birthday: string;
    }>({ fields: ['email', 'name', 'picture', 'birthday'] });
    console.log(`Facebook user's email is ${result.email}`);
    console.log(result);
    this.fbUser = result;

    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed in with Facebook.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  async facebookLogout() {
    await FacebookLogin.logout();
    this.fbUser = null;
    this.token = null;

    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed out of Facebook.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  // async facebookLogin() {
  //   // login with facebook
  //   // console.log('facebook login');

  //   const FACEBOOK_PERMISSIONS = ['email', 'user_birthday', 'user_photos'];

  //   const result = await this.fbLogin.login({
  //     permissions: FACEBOOK_PERMISSIONS,
  //   });
  //   console.log('result', result);

  //   if (result.accessToken && result.accessToken.userId) {
  //     this.token = result.accessToken.token;
  //     this.loadUserData();
  //   } else if (result.accessToken && !result.accessToken.userId) {
  //     //web only gets the access token but no user id
  //     // directly call get token to get the user id
  //     this.getCurrentToken();
  //   } else {
  //     // login failed
  //   }
  // }

  // async getCurrentToken() {
  //   const result = await this.fbLogin.getCurrentAccessToken();
  //   if (result.accessToken) {
  //     this.token = result.accessToken.token;
  //     this.loadUserData();
  //   } else {
  //     // not logged in
  //   }
  // }

  // async loadUserData() {
  //   const url = `https://graph.facebook.com/${this.token.userId}?fields=id,name,picture.width(720),birthday,email&access_token=${this.token.token}`;
  //   this.http.get(url).subscribe((res) => {
  //     this.fbUser = res;
  //     console.log('fbUser', this.fbUser);
  //   });
  // }

  // async facebookLogout() {
  //   await this.fbLogin.logout();
  //   this.fbUser = null;
  //   this.token = null;
  // }

  // run this command in your cmd prompt to get the hash key for facebook login
  //keytool -exportcert -alias androiddebugkey -keystore "C:\Users\ADMIN\.android\debug.keystore" | "C:\Program Files\OpenSSL-Win64\bin\openssl" sha1 -binary | "C:\Program Files\Git\usr\bin\base64.exe"
  //remember to download the openssl from the internet and add it to your environment variables
  //the hash key will be displayed in the cmd prompt
}
