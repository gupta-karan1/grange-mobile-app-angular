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
  items = this.supabaseService.todos;

  constructor(
    private router: Router,
    private supabaseService: SupabaseService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async createTodo() {
    const alert = await this.alertCtrl.create({
      header: 'New Achievement',
      inputs: [
        {
          name: 'task',
          placeholder: 'Learn Ionic',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Add',
          handler: (data: any) => {
            this.supabaseService.addTodo(data.task);
          },
        },
      ],
    });

    await alert.present();
  }

  delete(item: Todo) {
    this.supabaseService.removeTodo(item.id);
  }

  toggleDone(item: Todo) {
    this.supabaseService.updateTodo(item.id, !item.is_complete);
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

    // Clear the user data from local storage
    // localStorage.removeItem('currentUser');

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
