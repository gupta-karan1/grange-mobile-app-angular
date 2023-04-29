import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController, isPlatform } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
// import '@codetrix-studio/capacitor-google-auth';
// import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
// import {
//   FacebookLogin,
//   FacebookLoginResponse,
// } from '@capacitor-community/facebook-login';

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
  // fbLogin!: FacebookLoginResponse;
  fbUser: any = null; // the facebook user object that will be returned from the facebook login plugin
  token: any; // the facebook token that will be returned from the facebook login plugin
  twitterUser: any = null; // the twitter user object that will be returned from the twitter login plugin

  githubUser: any = null; // the github user object that will be returned from the github login plugin

  constructor(
    private fb: FormBuilder,
    private loadController: LoadingController,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private toastCtrl: ToastController
  ) {
    //initialize the google auth plugin
    // if (!isPlatform('capacitor')) {
    //   // if the platform is not capacitor
    //   GoogleAuth.initialize({
    //     // initialize the google auth plugin
    //     // client id
    //     //? Important: I had to create a new client id separate from the auto-generated one that comes from firestore and embed that within firestore whitelist as well as the google api console because the localhost:8100 was not being recognized as a valid origin
    //     clientId:
    //       '446380689792-1epieubs0ehbls3rsvab4kvbpqccgfpv.apps.googleusercontent.com',
    //     scopes: ['profile', 'email'],
    //   });
    // }
    // GoogleAuth.initialize({
    //   // initialize the google auth plugin
    //   // client id
    //   clientId:
    //     '446380689792-1epieubs0ehbls3rsvab4kvbpqccgfpv.apps.googleusercontent.com',
    //   scopes: ['profile', 'email'], // scopes defined in the google api console
    // });
    //initialize the facebook login plugin
    // this.setupFbLogin();
    // //initialize the facebook login plugin
    // FacebookLogin.initialize({
    //   appId: '6367860876570694',
    // });
    //twitter client id: dnZfeUd1aHdqNDBsUU4tTURXZXE6MTpjaQ
    //this is inserted in the firebase authentication console
    //twitter client secret: OTpsVGTdaFA-ptkhqQdRorvBfCKJvYUPsQLOZVlIeoX1Tizd6G
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
        message: 'Registration Successful.',
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

      console.log(user);

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

  // async googleLogin(): Promise<any> {
  //   this.googleUser = await GoogleAuth.signIn(); // sign in with google
  //   // console.log('user', this.googleUser, this.googleUser.email); // log the user object to the console

  //   //display a toast message to the user
  //   const toast = await this.toastCtrl.create({
  //     message: 'You are signed in with Google.',
  //     duration: 3000,
  //     position: 'bottom',
  //   });
  //   await toast.present();

  //   return this.googleUser;
  // }
  async googleLogin() {
    const user = await this.authService.firebaseLoginWithGoogle(); // login the user with google using the firebase login with google method in the auth service
    if (user) {
      this.googleUser = user; // set the googleUser to the user returned from the firebase login with google method in the auth service
      console.log(this.googleUser); // log the googleUser to the console
      // if the user is logged in, navigate to the profile page
      setTimeout(() => {
        this.router.navigateByUrl('/tabs/tab4', { replaceUrl: true });
      }, 5000);
      //display a toast message to the user
      const toast = await this.toastCtrl.create({
        message: 'You are signed in with Google.',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  async googleSignOut() {
    // await GoogleAuth.signOut(); // sign out of google
    await this.authService.firebaseLogoutWithGoogle(); // logout of google using the firebase logout with google method in the auth service
    this.googleUser = null; // set the google user to null
    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed out of Google.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  async facebookLogin() {
    const user = await this.authService.firebaseLoginWithFacebook(); // login the user with facebook using the firebase login with facebook method in the auth service

    if (user) {
      this.fbUser = user; // set the fbUser to the user returned from the firebase login with facebook method in the auth service
      // console.log(this.fbUser); // log the fbUser to the console
      // if the user is logged in, navigate to the profile page
      setTimeout(() => {
        this.router.navigateByUrl('/tabs/tab4', { replaceUrl: true });
      }, 5000);
      //display a toast message to the user
      const toast = await this.toastCtrl.create({
        message: 'You are signed in with Facebook.',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  // async facebookLogin() {
  //   // login with facebook using the facebook login plugin
  //   const FACEBOOK_PERMISSIONS = [
  //     // permissions to request from the user
  //     'email',
  //     'user_birthday',
  //     'user_photos',
  //     'user_gender',
  //   ];

  //   const result = await FacebookLogin.login({
  //     // login with facebook
  //     permissions: FACEBOOK_PERMISSIONS, // permissions to request from the user
  //   });

  //   console.log('result', result);
  //   if (result.accessToken) {
  //     // if the access token is returned from facebook
  //     // Login successful.
  //     // console.log(`Facebook access token is ${result.accessToken.token}`);
  //     this.getCurrentAccessToken(); // get the current access token from facebook method is defined below
  //     // this.getCurrentUserProfile();
  //   }
  // }

  // async getCurrentAccessToken() {
  //   // get the current access token from facebook
  //   const result = await FacebookLogin.getCurrentAccessToken(); // get the current access token from facebook using the get current access token method in built in the facebook login plugin
  //   if (result.accessToken) {
  //     // if the access token is returned from facebook
  //     // console.log(`Facebook access token is ${result.accessToken.token}`);
  //     this.token = result.accessToken.token; // set the token to the access token returned from facebook
  //     this.getCurrentUserProfile(); //get the current user profile method is defined below
  //   }
  // }

  // async getCurrentUserProfile() {
  //   // get the current user profile from facebook
  //   const result = await FacebookLogin.getProfile<{
  //     // get the current user profile from facebook using the get current user profile method in built in the facebook login plugin
  //     email: string;
  //     name: string;
  //     picture: { data: { url: string } };
  //     birthday: string;
  //   }>({ fields: ['email', 'name', 'picture', 'birthday'] }); // fields to request from the user from facebook by defining the type of the result
  //   // console.log(`Facebook user's email is ${result.email}`);
  //   // console.log(result);
  //   this.fbUser = result; // set the fbUser to the result returned from facebook

  //   // if (user) {
  //   //   this.fbUser = user; // set the fbUser to the user returned from the firebase login with facebook method in the auth service
  //   //   // if the user is logged in, navigate to the profile page
  //   //   //display a toast message to the user
  //   // }
  // }

  async facebookLogout() {
    // logout of facebook using the facebook login plugin
    // await FacebookLogin.logout(); // logout of facebook using the logout method in built in the facebook login plugin
    await this.authService.firebaseLogoutWithFacebook(); // logout of firebase using the firebase logout with facebook method in the auth service
    this.fbUser = null; // set the fbUser to null
    // this.token = null; // set the token to null

    //navigate to the login page
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 5000);

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

  //! run this command in your cmd prompt to get the hash key for facebook login
  //keytool -exportcert -alias androiddebugkey -keystore "C:\Users\ADMIN\.android\debug.keystore" | "C:\Program Files\OpenSSL-Win64\bin\openssl" sha1 -binary | "C:\Program Files\Git\usr\bin\base64.exe"
  //remember to download the openssl from the internet and add it to your environment variables
  //the hash key will be displayed in the cmd prompt
  // the hash key is used to configure the facebook login in the facebook developer console for your app to work properly on android devices

  // twitter login  from auth service
  async twitterLogin() {
    const user = await this.authService.loginWithTwitter();
    if (user) {
      this.twitterUser = user;
      // console.log('twitterUser', this.twitterUser);

      //navigate to the tab4 page after 2 seconds of showing the data
      setTimeout(() => {
        this.router.navigate(['/tabs/tab4']);
      }, 5000);

      //display a toast message to the user
      const toast = await this.toastCtrl.create({
        message: 'You are signed in with Twitter.',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  // twitter logout from auth service
  async twitterLogout() {
    await this.authService.logoutWithTwitter();
    this.twitterUser = null;

    //navigate to the login page
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);

    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed out of Twitter.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }

  //github login from auth service
  async githubLogin() {
    const user = await this.authService.firebaseLoginWithGithub();
    if (user) {
      this.githubUser = user;
      // console.log(this.githubUser);

      //navigate to the tab4 page after 2 seconds of showing the data
      setTimeout(() => {
        this.router.navigate(['/tabs/tab4']);
      }, 5000);

      //display a toast message to the user
      const toast = await this.toastCtrl.create({
        message: 'You are signed in with Github.',
        duration: 3000,
        position: 'bottom',
      });
      await toast.present();
    }
  }

  //github logout from auth service
  async githubLogout() {
    await this.authService.firebaseLogoutWithGithub();
    this.githubUser = null;

    //navigate to the login page
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);

    //display a toast message to the user
    const toast = await this.toastCtrl.create({
      message: 'You are signed out of Github.',
      duration: 3000,
      position: 'bottom',
    });
    await toast.present();
  }
}
