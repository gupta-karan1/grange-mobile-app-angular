import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const TODO_DB = 'todos'; // define the name of the table in the database

const NOTIFICATION_DB = 'notifications'; // define the name of the table in the database

export interface Todo {
  id: number;
  inserted_at: string;
  is_complete: boolean;
  task: string;
  user_id: string;
}
export interface Notification {
  id: number;
  inserted_at: string;
  is_read: boolean;
  notification: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient; // define supabase as a SupabaseClient type variable (from @supabase/supabase-js)

  private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null); // this is a BehaviorSubject from rxjs that is used to store the current user and is initialized with null as the default value

  private _todos: BehaviorSubject<any> = new BehaviorSubject([]); // this is a BehaviorSubject from rxjs that is used to store the todos and is initialized with an empty array as the default value

  private _notifications: BehaviorSubject<any> = new BehaviorSubject([]); // this is a BehaviorSubject from rxjs that is used to store the notifications and is initialized with an empty array as the default value

  // Try to recover our user session
  async ngOnInit() {
    await this.loadUser();
  }

  constructor(private router: Router) {
    // initialize supabase with the environment variables
    this.supabase = createClient(
      // createClient is a function from @supabase/supabase-js that is used to initialize supabase
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

    // Try to recover our user session
    this.loadUser();

    this.supabase.auth.onAuthStateChange((event, session) => {
      this.loadNotifications();
      //notifications are made accessible without login here
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session?.user);
        this.loadTodos();
        this.handleTodosChanged();
        this.handleNotificationsChanged(); // handle notifications changed
      } else {
        this._currentUser.next(false);

        this.handleNotificationsChanged(); // handle notifications changed
      }
    });
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

  get currentUserValue(): User | null {
    return this._currentUser.value;
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

      //pass the data to the currentUser BehaviorSubject
      //! This was the final issue that was preventing the user from being logged in
      //? The data was not being passed to the currentUser BehaviorSubject
      //? This was because the data was not being passed to the currentUser BehaviorSubject
      //? The user was able to access the list page even though they were not logged in
      this._currentUser.next(data?.user); // pass the user to the currentUser BehaviorSubject

      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  }

  async signOut() {
    await this.supabase.auth.refreshSession(); // refreshSession is a function from @supabase/supabase-js that is used to refresh the session
    await this.supabase.auth.signOut(); // signOut is a function from @supabase/supabase-js that is used to sign out a user
    // set the current user to null after signing out
    this._currentUser.next(null);
    this.router.navigateByUrl('/tabs/list-login'); // redirect to the login page after signing out
    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('event', event);
      console.log('session', session);
    });
  }

  isLoggedIn() {
    // this function is used to check if the user is logged in which will be used in auth.guard.ts to protect the routes from unauthorized access

    const user = this._currentUser.getValue(); // get the current value of the BehaviorSubject
    console.log('user: ', user);
    return !!user; // if user is not null or undefined, return true else return false
  }

  get todos(): Observable<Todo[]> {
    // this is a getter function that is used to return the todos BehaviorSubject as an Observable to access the private todos BehaviorSubject from outside the service
    return this._todos.asObservable(); // return the todos BehaviorSubject as an Observable
  }

  get notifications(): Observable<Notification[]> {
    // this is a getter function that is used to return the notifications BehaviorSubject as an Observable to access the private notifications BehaviorSubject from outside the service
    return this._notifications.asObservable(); // return the notifications BehaviorSubject as an Observable
  }

  async loadNotifications() {
    const query = await this.supabase.from(NOTIFICATION_DB).select('*'); // select all the notifications from the database table and store them in a variable called query
    // this is async because we are using await to wait for the query to finish before continuing
    console.log('query: ', query);
    this._notifications.next(query.data); // pass the notifications to the notifications BehaviorSubject
  }

  async deleteNotification(id: number) {
    await this.supabase.from(NOTIFICATION_DB).delete().match({ id }); // delete the notification from the database table
  }

  async loadTodos() {
    const query = await this.supabase.from(TODO_DB).select('*'); // select all the todos from the database table and store them in a variable called query
    // this is async because we are using await to wait for the query to finish before continuing
    // console.log('query: ', query);
    this._todos.next(query.data); // pass the todos to the todos BehaviorSubject
  }

  async addTodo(task: string) {
    const newTodo = {
      user_id: this._currentUser.value.id,
      task,
    };

    const result = await this.supabase.from(TODO_DB).insert(newTodo); // insert the new todo into the database table
  }

  async removeTodo(id: number) {
    await this.supabase.from(TODO_DB).delete().match({ id }); // delete the todo from the database table
  }

  async updateTodo(id: number, is_complete: boolean) {
    await this.supabase.from(TODO_DB).update({ is_complete }).match({ id }); // update the todo in the database table
  }

  handleTodosChanged() {
    // this function is used to handle changes to the todos in the database table and update the todos BehaviorSubject in real-time when the database table is updated
    this.supabase
      .channel(TODO_DB) // channel is a function from @supabase/supabase-js that is used to listen for changes to the database table
      .on('postgres_changes', { event: '*', schema: '*' }, (payload: any) => {
        // on method takes in 3 arguments: the event type, the schema, and a callback function that takes in the payload
        //!Remember to make the above changes which are different from old version of supabase and what is on many videos. The above is the new way to do it. It took me a lot of time to read through the documentation to figure this out.
        console.log('payload: ', payload); // log the payload to the console

        // if the eventType is DELETE, UPDATE, or INSERT, then update the todos BehaviorSubject with the new todos from the database table
        if (payload.eventType === 'DELETE') {
          //take the old todos and filter out the todo that was deleted
          const oldItem: Todo = payload.old;
          const newValue = this._todos.value.filter(
            // filter out the todo that was deleted
            (item: any) => oldItem['id'] !== item.id
          );
          this._todos.next(newValue); // pass the new todos to the todos BehaviorSubject to update the todos
        } else if (payload.eventType === 'UPDATE') {
          const updatedItem: Todo = payload.new;
          const newValue = this._todos.value.map((item: any) => {
            // map over the todos and update the todo that was updated
            if (updatedItem['id'] === item.id) {
              // return updatedItem;
              item = updatedItem;
            }
            return item;
          });
          this._todos.next(newValue); // pass the new todos to the todos BehaviorSubject to update the todos
        } else if (payload.eventType === 'INSERT') {
          const newItem: Todo = payload.new;
          this._todos.next([...this._todos.value, newItem]); // pass the new todos to the todos BehaviorSubject to update the todos using the spread operator to add the new todo to the todos
        }
      })
      .subscribe();
  }

  handleNotificationsChanged() {
    // this function is used to handle changes to the notifications in the database table and update the notifications BehaviorSubject in real-time when the database table is updated
    this.supabase
      .channel(NOTIFICATION_DB) // channel is a function from @supabase/supabase-js that is used to listen for changes to the database table
      .on('postgres_changes', { event: '*', schema: '*' }, (payload: any) => {
        // on method takes in 3 arguments: the event type, the schema, and a callback function that takes in the payload
        //!Remember to make the above changes which are different from old version of supabase and what is on many videos. The above is the new way to do it. It took me a lot of time to read through the documentation to figure this out.
        console.log('payload: ', payload); // log the payload to the console

        // if the eventType is DELETE, UPDATE, or INSERT, then update the notifications BehaviorSubject with the new notifications from the database table
        if (payload.eventType === 'DELETE') {
          //take the old notifications and filter out the notification that was deleted
          const oldItem: Notification = payload.old;
          const newValue = this._notifications.value.filter(
            // filter out the notification that was deleted
            (item: Notification) => oldItem['id'] !== item.id
          );
          this._notifications.next(newValue); // pass the new notifications to the notifications BehaviorSubject to update the notifications
        }
      })
      .subscribe();
  }
}
