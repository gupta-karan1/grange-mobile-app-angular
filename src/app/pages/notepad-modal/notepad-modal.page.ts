import { QuillModule } from 'ngx-quill';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { NotepadPage } from '../notepad/notepad.page';

@Component({
  selector: 'app-notepad-modal',
  templateUrl: './notepad-modal.page.html',
  styleUrls: ['./notepad-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, QuillModule, NotepadPage],
})
export class NotepadModalPage implements OnInit {
  @Input() data: any;
  @Input() wordCount: any;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

  async saveNote() {
    // this function saves the note in the database
    console.log(this.data);
    this.closeModal();

    // this is where you can save the note in the database
    // present a toast message to the user that the note is saved

    const toast = await this.toastCtrl.create({
      message: 'Note saved',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
