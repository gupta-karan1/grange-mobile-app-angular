import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiaryDataService, Event } from 'src/app/services/diary-data.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CalModalPage implements OnInit {
  newEvent: Event = {
    title: '',
    description: '',
    startTime: new Date(),
    endTime: new Date(),
  };

  constructor(
    private modalCtrl: ModalController,
    private diaryDataService: DiaryDataService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  updateStartTime(event: any) {
    // update the startTime property of the newEvent object with the value from the ion-datetime
    // console.log('startTime: ' + event.detail.value);
    this.newEvent.startTime = new Date(event.detail.value);
  }

  updateEndTime(event: any) {
    // update the endTime property of the newEvent object with the value from the ion-datetime
    // console.log('endTime: ' + event.detail.value);
    this.newEvent.endTime = new Date(event.detail.value);
  }

  async saveEvent() {
    // save the event to the firestore database
    // create a new event object
    // const event = this.newEvent;
    // console.log(event);
    // add the event to the firestore
    await this.diaryDataService.addEvent(this.newEvent);
    // show a toast message
    const toast = await this.toastCtrl.create({
      message: 'Event added',
      duration: 2000,
    });
    toast.present();
    // dismiss the modal
    await this.modalCtrl.dismiss();

    // reset the newEvent object
    this.newEvent = {
      title: '',
      description: '',
      startTime: new Date(),
      endTime: new Date(),
    };
  }

  //dismiss the modal
  async cancelEvent() {
    await this.modalCtrl.dismiss();
  }
}
