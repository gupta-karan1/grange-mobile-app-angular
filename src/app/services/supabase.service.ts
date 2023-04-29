import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const TODO_DB = 'todos';

export interface Todo {
  id: number;
  inserted_at: string;
  is_complete: boolean;
  task: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  supabase: SupabaseClient; // define supabase as a SupabaseClient type variable (from @supabase/supabase-js)

  private _todos: BehaviorSubject<Todo[]> = new BehaviorSubject<any>([]); // this is a BehaviorSubject from rxjs that is used to store the todos and is initialized with an empty array as the default value

  private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null); // this is a BehaviorSubject from rxjs that is used to store the current user and is initialized with null as the default value

  // Try to recover our user session
  async ngOnInit() {
    await this.loadUser();
  }

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

    // Try to recover our user session
    this.loadUser();

    this.supabase.auth.onAuthStateChange((event, session) => {
      if (event == 'SIGNED_IN') {
        this._currentUser.next(session?.user);
        this.loadTodos();
        this.handleTodosChanged();
      } else {
        this._currentUser.next(false);
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
    return this._todos.asObservable();
  }

  async loadTodos() {
    const query = await this.supabase.from(TODO_DB).select('*');
    console.log('query', query);
    console.log('query.data', query.data);
    this._todos.next(query.data as Todo[]);
  }

  // async addTodo(task: string) {
  //   const newTodo = {
  //     user_id: this.currentUserValue?.id,
  //     task,
  //   };
  //   const { data, error } = await this.supabase.from(TODO_DB).insert(newTodo);
  //   if (error) {
  //     console.log('error', error);
  //   }
  //   if (data) {
  //     console.log('data', data);
  //     const newTodo = { id: data[0].id, ...data[0] };
  //     this._todos.next([...this._todos.value, newTodo]);
  //   }
  // }

  async addTodo(task: string) {
    const newTodo = {
      user_id: this.currentUserValue?.id,
      task,
    };
    // You could check for error, minlegth of task is 3 chars!
    const result = await this.supabase.from(TODO_DB).insert(newTodo);
    console.log('result', result);
    //create a loading indicator until the result is returned and displayed on the page
    const { data, error } = result;
    if (error) {
      console.log('error', error);
    }
    if (data) {
      console.log('data', data);
    }
  }

  async removeTodo(id: any) {
    await this.supabase.from(TODO_DB).delete().match({ id });
    const updatedTodos = this._todos.value.filter((todo) => todo.id !== id);
    this._todos.next(updatedTodos);
  }

  // async removeTodo(id: any) {
  //   await this.supabase.from(TODO_DB).delete().match({ id });
  // }

  async updateTodo(id: any, is_complete: boolean) {
    await this.supabase.from(TODO_DB).update({ is_complete }).match({ id });
  }

  // async updateTodo(id: any, is_complete: boolean) {
  //   await this.supabase.from(TODO_DB).update({ is_complete }).match({ id });
  //   const updatedTodo = { ...this._todos.value.find((todo) => todo.id === id), is_complete };
  //   const updatedTodos = this._todos.value.map((todo) =>
  //     todo.id === updatedTodo.id ? updatedTodo : todo
  //   );
  //   this._todos.next(updatedTodos);
  // }

  handleTodosChanged() {
    const realtime = this.supabase
      .channel(TODO_DB)
      .on('broadcast', { event: '*' }, (payload: any) => {
        console.log('Todos changed: ', payload);
        const { eventType, changes } = payload;

        if (eventType === 'INSERT') {
          const newTodo = { id: payload.id, ...changes };
          this._todos.next([...this._todos.value, newTodo]);
        } else if (eventType === 'UPDATE') {
          const updatedTodo = { id: payload.id, ...changes };
          const updatedTodos = this._todos.value.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          );
          this._todos.next(updatedTodos);
        } else if (eventType === 'DELETE') {
          const updatedTodos = this._todos.value.filter(
            (todo) => todo.id !== payload.id
          );
          this._todos.next(updatedTodos);
        }
      })
      .subscribe();

    return { realtime };
  }

  // handleTodosChanged() {
  //   // this function is used to handle changes to the todos table in the database
  //   const realtime = this.supabase
  //     .channel(TODO_DB)
  //     .on('broadcast', { event: '*' }, (payload: any) => {
  //       console.log('Todos changed: ', payload);
  //       const { eventType, old, new: newItem } = payload;

  //       if (eventType === 'INSERT') {
  //         this._todos.next([...this._todos.value, newItem]);
  //       } else if (eventType === 'UPDATE') {
  //         const updatedTodos = this._todos.value.map((todo) =>
  //           todo.id === newItem.id ? newItem : todo
  //         );
  //         this._todos.next(updatedTodos);
  //       } else if (eventType === 'DELETE') {
  //         const updatedTodos = this._todos.value.filter(
  //           (todo) => todo.id !== old.id
  //         );
  //         this._todos.next(updatedTodos);
  //       }

  //       // if (payload.eventType == 'DELETE') {
  //       //   // Filter out the removed item
  //       //   const oldItem: Todo = payload.old;
  //       //   const newValue = this._todos.value.filter(
  //       //     (item) => oldItem.id != item.id
  //       //   );
  //       //   this._todos.next(newValue);
  //       // } else if (payload.eventType == 'INSERT') {
  //       //   // Add the new item
  //       //   const newItem: Todo = payload.new;
  //       //   this._todos.next([...this._todos.value, newItem]);
  //       // } else if (payload.eventType == 'UPDATE') {
  //       //   // Update one item
  //       //   const updatedItem: Todo = payload.new;
  //       //   const newValue = this._todos.value.map((item) => {
  //       //     if (updatedItem.id == item.id) {
  //       //       item = updatedItem;
  //       //     }
  //       //     return item;
  //       //   });
  //       //   this._todos.next(newValue);
  //       // }
  //     })
  //     .subscribe();

  //   return { realtime };
  // }
  // // async handleTodosChanged() {
  //   return this.supabase
  //     .channel(TODO_DB)
  //     .on('broadcast', { event: '*' }, (payload: any) => {
  //       console.log('Todos changed: ', payload);

  //       if (payload.eventType == 'DELETE') {
  //         // Filter out the removed item
  //         const oldItem: Todo = payload.old;
  //         const newValue = this._todos.value.filter(
  //           (item) => oldItem.id != item.id
  //         );
  //         this._todos.next(newValue);
  //       } else if (payload.eventType == 'INSERT') {
  //         // Add the new item
  //         const newItem: Todo = payload.new;
  //         this._todos.next([...this._todos.value, newItem]);
  //       } else if (payload.eventType == 'UPDATE') {
  //         // Update one item
  //         const updatedItem: Todo = payload.new;
  //         const newValue = this._todos.value.map((item) => {
  //           if (updatedItem.id == item.id) {
  //             item = updatedItem;
  //           }
  //           return item;
  //         });
  //         this._todos.next(newValue);
  //       }
  //     })
  //     .subscribe();
  // }

  // async handleTodosChanged() {
  //   const { data: todos, error } = await this.supabase
  //     .from(TODO_DB)
  //     .select('*');

  //   if (error) {
  //     console.error(error);
  //     return;
  //   }

  //   this._todos.next(todos as Todo[]);

  //   const realtime = this.supabase
  //     .channel(TODO_DB)
  //     .on('broadcast', { event: 'sync' }, (payload) => {
  //       const { eventType, old, new: newItem } = payload;

  //       if (eventType === 'INSERT') {
  //         this._todos.next([...this._todos.value, newItem]);
  //       } else if (eventType === 'UPDATE') {
  //         const updatedTodos = this._todos.value.map((todo) =>
  //           todo.id === newItem.id ? newItem : todo
  //         );
  //         this._todos.next(updatedTodos);
  //       } else if (eventType === 'DELETE') {
  //         const updatedTodos = this._todos.value.filter(
  //           (todo) => todo.id !== old.id
  //         );
  //         this._todos.next(updatedTodos);
  //       }
  //     })
  //     .subscribe();

  //   return { realtime };
  // }
}
