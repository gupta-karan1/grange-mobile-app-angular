import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

// const TODO_DB = 'todos';

// export interface Todo {
//   id: number;
//   inserted_at: string;
//   is_complete: boolean;
//   task: string;
//   user_id: string;
// }

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient; // define supabase as a SupabaseClient type variable (from @supabase/supabase-js)

  // private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject([]); // this is a BehaviorSubject from rxjs that is used to store the todos and is initialized with an empty array as the default value

  private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null); // this is a BehaviorSubject from rxjs that is used to store the current user and is initialized with null as the default value

  // Try to recover our user session
  // this.loadUser();

  constructor(private router: Router) {
    // initialize supabase with the environment variables
    this.supabase = createClient(
      // createClient is a function from @supabase/supabase-js
      environment.supabaseUrl, // environment variables from src/environments/environment.ts
      environment.supabaseKey,
      {
        auth: {
          // auth is an object from @supabase/supabase-js that is used to store the logged-in session
          autoRefreshToken: true, // autoRefreshToken is a boolean from @supabase/supabase-js that is used to refresh the token for logged-in users
          persistSession: true, // persistSession is a boolean from @supabase/supabase-js that is used to store the logged-in session
        },
      }
    );
  }

  async loadUser() {
    const user = await this.supabase.auth.getUser();

    if (user) {
      this._currentUser.next(user);
    } else {
      this._currentUser.next(false);
    }
  }

  get currentUser(): Observable<User> {
    return this._currentUser.asObservable();
  }

  async signUp(credentials: { email: string; password: string }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signUp(credentials);
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  signIn(credentials: { email: string; password: string }) {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await this.supabase.auth.signInWithPassword(
        credentials
      );
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  // const { data, error } = await supabase.auth.signInWithOAuth({
  //   provider: 'github'
  // })

  signOut() {
    this.supabase.auth.signOut(); // signOut is a function from @supabase/supabase-js that is used to sign out a user
    this.router.navigate(['/login']);
  }
}
