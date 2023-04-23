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
    // async function

    // open camera from web browser and take a photo
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Prompt, // Source of image is set to prompt so that the user can choose between camera and photo library
    });

    if (image) {
      const loading = await this.loadingController.create();
      await loading.present();

      const result = await this.avatarService.uploadAvatar(image);
      await loading.dismiss();

      // reload the profile to get the new image
      this.profile = (await this.avatarService.getUserProfile()) || {
        imageUrl: null,
      };
      if (result) {
        const toast = await this.toastController.create({
          message: 'Profile Pic Updated.',
          duration: 3000,
        });
        await toast.present();
      }

      if (!result) {
        const alert = await this.alertController.create({
          header: 'Upload failed',
          message: 'There was a problem uploading your avatar.',
          buttons: ['OK'],
        });
        await alert.present();
      }
    }
  }
}
