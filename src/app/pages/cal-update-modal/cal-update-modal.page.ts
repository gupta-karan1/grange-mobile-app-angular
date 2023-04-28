import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiaryDataService, Event } from 'src/app/services/diary-data.service';
import { ToastController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-cal-update-modal',
  templateUrl: './cal-update-modal.page.html',
  styleUrls: ['./cal-update-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CalUpdateModalPage implements OnInit {
  @Input() id!: string; // id of the event taken from the modal component props
  @Input() event!: Event; // event object
  // input decorator is used here to pass the id of the event to the modal component

  // newStartTime: string = new Date(
  //   this.event.startTime.getSeconds() * 1000
  // ).toISOString();
  // newEndTime: string = new Date(
  //   this.event.endTime.getSeconds() * 1000
  // ).toISOString();

  constructor(
    private modalCtrl: ModalController,
    private diaryDataService: DiaryDataService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.diaryDataService.getEventById(this.id).subscribe((res) => {
      this.event = res;
    });

    console.log(this.event.startTime);
  }

  updateStartTime(event: any) {
    // update the startTime property of the newEvent object with the value from the ion-datetime
    // console.log('startTime: ' + event.detail.value);
    this.event.startTime = new Date(event.detail.value);
  }

  updateEndTime(event: any) {
    // update the endTime property of the newEvent object with the value from the ion-datetime
    // console.log('endTime: ' + event.detail.value);
    this.event.endTime = new Date(event.detail.value);
  }

  //update event in firestore
  async updateEvent() {
    await this.diaryDataService.updateEvent(this.event);
    await this.modalCtrl.dismiss();
    // create a toast message to show that the event has been updated
    const toast = await this.toastCtrl.create({
      message: 'Event updated',
      duration: 2000,
    });
    await toast.present();
  }

  //delete event from firestore
  async deleteEvent() {
    await this.diaryDataService.deleteEventById(this.event);
    await this.modalCtrl.dismiss();
    // create a toast message to show that the event has been deleted
    const toast = await this.toastCtrl.create({
      message: 'Event deleted',
      duration: 2000,
    });
    await toast.present();
  }

  //dismiss modal
  async cancelEvent() {
    await this.modalCtrl.dismiss();
  }
}
