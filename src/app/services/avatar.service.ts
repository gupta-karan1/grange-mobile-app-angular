import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  getDoc,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadString,
} from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root',
})
export class AvatarService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private storage: Storage
  ) {}

  // getUserProfile() {
  //   // get the user's profile
  //   const user = this.auth.currentUser;
  //   const userDocRef = user ? doc(this.firestore, `users/${user.uid}`) : null; // if user is logged in, get the user's document reference from the firestore database
  //   // using optional chaining operator to check if userDocRef is null
  //   return userDocRef ? docData(userDocRef) : null; // if userDocRef is not null, return the user's document data
  // }

  async getUserProfile() {
    const user = this.auth.currentUser;
    if (user) {
      const userDocRef = doc(this.firestore, `users/${user.uid}`);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        return {
          imageUrl: userData['imageUrl'], // ensure the object has the imageUrl property
          // add other properties as needed
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async uploadAvatar(cameraFile: Photo) {
    // add the cameraFile parameter
    const user = this.auth.currentUser; // get the user's profile
    if (user) {
      const path = `uploads/${user.uid}/profile.png`; // create a path to store the image
      const storageRef = ref(this.storage, path); // get a reference to the storage bucket
      try {
        await uploadString(
          storageRef,
          cameraFile?.base64String || '',
          'base64'
        ); // upload the image to the storage bucket
        //  This expression uses optional chaining (?.) to safely access the base64String property only if cameraFile is not undefined. If cameraFile is undefined, the expression evaluates to the empty string (''), which can safely be passed as the third argument to uploadString.
        const imageUrl = await getDownloadURL(storageRef); // get the image url
        const userDocRef = doc(this.firestore, `users/${user.uid}`); // get the user's document reference
        await setDoc(userDocRef, { imageUrl }); // update the user's document with the image url
        return true; // return the image url
      } catch (e) {
        return null;
      }
    } else {
      return null;
    }
  }
}
