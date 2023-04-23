import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  AlertController,
  IonicModule,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { DiaryDataService } from 'src/app/services/diary-data.service';
import { DiaryModalPage } from '../diary-modal/diary-modal.page';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DiaryModalPage],
})
export class DiaryPage implements OnInit {
  selectTabs: string = 'notes'; // set the default tab
  notes: any = []; // array of notes

  constructor(
    private diaryDataService: DiaryDataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.diaryDataService.getNotes().subscribe((res) => {
      // console.log(res);
      // subscribe to the notes observable
      this.notes = res; // assign the notes property to the array of notes returned by the observable
    });
  }

  ngOnInit() {}

  async openNote(note: any) {
    // open the note
    const modal = await this.modalCtrl.create({
      // create a modal
      component: DiaryModalPage, // set the modal component
      componentProps: { id: note.id }, // pass the id of the note to the modal
      breakpoints: [0, 0.5, 0.75, 1], // set the breakpoints
      initialBreakpoint: 0.5, // set the initial breakpoint
    }); // create a modal

    modal.present(); // present the modal
  }

  async addNote() {
    // add a note
    const alert = await this.alertCtrl.create({
      // create an alert
      header: 'Add Note', // set the header
      inputs: [
        // array of inputs
        {
          name: 'title', // input name
          type: 'text', // input type
          placeholder: 'Enter Your Note Title', // input placeholder
        },
        {
          name: 'text', // input name
          type: 'textarea', // input type
          placeholder: 'I need to learn react tomorrow...', // input placeholder
        },
      ],
      buttons: [
        // array of buttons
        {
          text: 'Cancel', // button text
          role: 'cancel', // set to cancel role
          cssClass: 'secondary', // set a css class for buttons
          handler: () => {
            // button handler
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Save', // button text
          handler: (note) => {
            // button handler
            console.log(note);
            this.diaryDataService.addNote({
              title: note.title,
              text: note.text,
            }); // add the note to the firestore
            const toast = this.toastCtrl.create({
              // create a toast
              message: 'Note Added', // set the message
              duration: 2000, // set the duration
            }); // create a toast
            toast.then((toast) => toast.present()); // present the toast
          },
        },
      ],
    }); // create an alert
    alert.present(); // present the alert
  }
}
