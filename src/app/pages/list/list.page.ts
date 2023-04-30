import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { SupabaseService, Todo } from 'src/app/services/supabase.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class ListPage implements OnInit {
  items = this.supabaseService.todos; // define items as an array of Todo type variables from src/app/services/supabase.service.ts (this is the array of todos that will be displayed in the list)

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async createTodo() {
    // create a new todo item
    const alert = await this.alertCtrl.create({
      // create an alert controller
      header: 'New Achievement',
      inputs: [
        {
          name: 'task',
          placeholder: 'Mastered Ionic',
        },
      ],
      buttons: [
        // create the buttons for the alert controller
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (data: any) => {
            // handle the data from the alert controller
            this.supabaseService.addTodo(data.task); // add the new todo item to the database using the addTodo function from src/app/services/supabase.service.ts
            // present a toast message to show todo item added
            this.toastController
              .create({
                message: 'Achievement added',
                duration: 2000,
              })

              .then((toast) => {
                toast.present();
              });
          },
        },
      ],
    });
    await alert.present(); // present the alert controller
  }

  delete(item: Todo) {
    // delete the todo item from the database
    this.supabaseService.removeTodo(item.id); // remove the todo item from the database using the removeTodo function from src/app/services/supabase.service.ts

    // present a toast message to show todo item deleted
    this.toastController
      .create({
        message: 'Achievement deleted',
        duration: 2000,
      })
      .then((toast) => {
        toast.present();
      });
  }

  toggleDone(item: Todo) {
    // toggle the is_complete value of the todo item
    this.supabaseService.updateTodo(item.id, !item.is_complete); // update the todo item in the database using the updateTodo function from src/app/services/supabase.service.ts
  }

  async supabaseLogout() {
    //logout the user from supabase by creating a loading controller
    const loading = await this.loadingController.create({
      message: 'Logging out...',
      spinner: 'crescent',
      duration: 2000,
      showBackdrop: true,
    });
    await loading.present();

    //logout the user from supabase
    this.supabaseService.signOut();

    //dismiss the loading controller
    await loading.dismiss();
    this.router.navigateByUrl('/tabs/list-login', { replaceUrl: true });
    //present a toast message to show logout success
    const toast = await this.toastController.create({
      message: 'You have been logged out',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
