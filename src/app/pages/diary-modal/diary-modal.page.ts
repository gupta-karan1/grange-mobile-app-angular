import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { DiaryDataService, Note } from 'src/app/services/diary-data.service';
import { Input } from '@angular/core';

@Component({
  selector: 'app-diary-modal',
  templateUrl: './diary-modal.page.html',
  styleUrls: ['./diary-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DiaryModalPage implements OnInit {
  @Input() id!: string; // id of the note taken from the modal component props
  note!: Note; // note object

  constructor(
    private diaryDataService: DiaryDataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.diaryDataService.getNoteById(this.id).subscribe((res) => {
      this.note = res; // assign the note property to the note returned by the observable
    });
  }

  // update the note
  async updateNote() {
    this.diaryDataService.updateNoteById(this.note); // update the note
    const toast = await this.toastCtrl.create({
      // create a toast
      message: 'Note Updated', // set the message
      duration: 2000, // set the duration
    }); // create a toast
    toast.present(); // present the toast
    this.modalCtrl.dismiss(); // dismiss the modal
  }

  // delete the note
  async deleteNote() {
    await this.diaryDataService.deleteNoteById(this.note);
    const toast = await this.toastCtrl.create({
      // create a toast
      message: 'Note Deleted', // set the message
      duration: 2000, // set the duration
    }); // create a toast
    toast.present(); // present the toast
    this.modalCtrl.dismiss(); // dismiss the modal
  }

  dismissModal() {
    //dismiss the modal
    this.modalCtrl.dismiss();
  }
}
