import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {} //inject the auth service

  async register({ email, password }: { email: string; password: string }) {
    // createUserWithEmailAndPassword(this.auth, email, password);
    try {
      //creating a try catch block to catch any errors
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      ); //if the user is registered, return the user
      return user;
    } catch (e) {
      return null; //if the user is not registered, return null
    }
  }

  // Binding element 'email' implicitly has an 'any' type.ts(7031). Resolve this error by adding a type annotation to the binding element.

  async login({ email, password }: { email: string; password: string }) {
    // creating a try catch block to catch any errors

    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      // if the user is logged in, return the user
      return user;
    } catch (e) {
      return null; // if the user is not logged in, return null
    }
  }

  logout() {
    //sign out the user
    return signOut(this.auth);
  }
}
