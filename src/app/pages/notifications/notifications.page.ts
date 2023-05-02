import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import {
  SupabaseService,
  Notification,
} from 'src/app/services/supabase.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NotificationsPage implements OnInit {
  notifications = this.supabaseService.notifications; // define notifications as an array of Notification type variables from src/app/services/supabase.service.ts (this is the array of notifications that will be displayed in the list)
  constructor(
    private supabaseService: SupabaseService,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  delete(item: Notification) {
    // delete the todo item from the database
    this.supabaseService.deleteNotification(item.id); // remove the todo item from the database using the removeTodo function from src/app/services/supabase.service.ts

    // present a toast message to show todo item deleted
    this.toastController
      .create({
        message: 'Notification deleted',
        duration: 2000,
      })
      .then((toast) => {
        toast.present();
      });
  }
}
