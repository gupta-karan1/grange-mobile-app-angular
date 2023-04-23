import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { RouterLink, Route } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AvatarService } from 'src/app/services/avatar.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController } from '@ionic/angular';

// import { ProfileDataService } from 'src/app/services/profile-data.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class Tab4Page implements OnInit {
  // profile = null;

  // set profile to null if no profile is found in the database and then set it to the profile variable if a profile is found in the database and initialize the profile variable to null
  profile: { imageUrl: string | null } = { imageUrl: null };

  constructor(
    private avatarService: AvatarService,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    try {
      // this.profile = await this.avatarService.getUserProfile();
      // below code sets the profile to null if no profile is found in the database
      // wait for the profile to be retrieved from the database and then set it to the profile variable or set it to null if no profile is found
      this.profile = (await this.avatarService.getUserProfile()) || {
        imageUrl: null,
      }; // if no profile, set to null
    } catch (e) {
      console.log('Error getting user profile', e); // log error
    }
  }

  // urlRandomImages = environment.urlRandomImages;

  // function to open camera and take a photo with slight modifications to the above function
  async addCameraImage() {
    // async function because it uses await to wait for the camera to open and take a photo and then upload the photo to the database and then reload the profile to get the new image and then display a toast message to the user.

    // open camera from web browser and take a photo
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt, // Source of image is set to prompt so that the user can choose between camera and photo library
    });

    if (image) {
      // if image is not null
      const loading = await this.loadingController.create(); // create a loading controller
      await loading.present(); // present the loading controller

      const result = await this.avatarService.uploadAvatar(image); // upload the image to the database
      await loading.dismiss(); // dismiss the loading controller

      // reload the profile to get the new image
      this.profile = (await this.avatarService.getUserProfile()) || {
        // if no profile, set to null
        imageUrl: null,
      };
      // display a toast message to the user
      if (result) {
        // if result is true
        const toast = await this.toastController.create({
          message: 'Profile Pic Updated.', // display message
          duration: 3000, // display for 3 seconds
        });
        await toast.present(); // present the toast message
      }

      // display an alert message to the user
      // if the upload failed
      if (!result) {
        // if result is false
        const alert = await this.alertController.create({
          header: 'Upload failed', // display message
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present(); // present the alert message
      }
    }
  }
}
