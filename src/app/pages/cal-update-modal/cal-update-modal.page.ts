import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DiaryDataService, Event } from 'src/app/services/diary-data.service';
import { ToastController } from '@ionic/angular';
import { format, utcToZonedTime } from 'date-fns-tz';

//install date-fns-tz
//npm install date-fns-tz --save

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

  formattedStartTime!: string;
  formattedEndTime!: string;
  isoStartTimeInIST!: string;

  // newEndTime: string = new Date(
  //   this.event.endTime.setUTCMinutes(this.event.endTime.getUTCMinutes() + 60)
  // ).toISOString();

  // newStartTime: string = new Date(
  //   this.event.startTime.setUTCMinutes(
  //     this.event.startTime.getUTCMinutes() + 60
  //   )
  // ).toISOString();

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

    // console.log(this.event.startTime);
    // console.log('ISO Start: ' + this.event.startTime.toISOString());
    // console.log('UTC Start: ' + this.event.startTime.toUTCString());

    // // get the current startTime of the event
    // const startTime = this.event.startTime;

    // // add 1 hour to the startTime in Irish Standard Time (GMT+1)
    // const startTimeInIST = new Date(startTime.getTime() + 60 * 60 * 1000);
    // console.log('IST Start: ' + startTimeInIST);
    // startTimeInIST.setHours(startTimeInIST.getHours() + 1);

    // // format the startTimeInIST as an ISO string
    // const isoStartTimeInIST = startTimeInIST.toISOString();

    // // print the ISO string to the console
    // console.log('ISO Start in IST: ' + isoStartTimeInIST);

    // const userTimeZone = 'Europe/Dublin';
    // const zonedStartTime = utcToZonedTime(this.event.startTime, userTimeZone);
    // const formattedStartTime = format(
    //   zonedStartTime,
    //   'yyyy-MM-dd HH:mm:ss zzzz',
    //   {
    //     timeZone: userTimeZone,
    //   }
    // );
    // const formattedEndTime = format(
    //   this.event.endTime,
    //   'yyyy-MM-dd HH:mm:ss zzzz',
    //   {
    //     timeZone: userTimeZone,
    //   }
    // );
    // console.log(formattedStartTime);
    // console.log(formattedEndTime);

    // Get the time zone set on the user's device
    // const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // const userTimeZone = 'Europe/Dublin';
    // // Use date-fns-tz to convert from UTC to a zoned time
    // this.zonedStartTime = utcToZonedTime(
    //   this.event.startTime,
    //   userTimeZone
    // ).toISOString();
    // console.log(this.zonedStartTime);
    // this.zonedEndTime = utcToZonedTime(this.event.endTime, userTimeZone);
    // this.event.startTime = new Date(
    //   this.event.startTime.setUTCMinutes(
    //     this.event.startTime.getUTCMinutes() + 60
    //   )
    // );

    // this.event.endTime = new Date(
    //   this.event.endTime.setUTCMinutes(this.event.endTime.getUTCMinutes() + 60)
    // );
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

  dismissModal() {
    //dismiss the modal
    this.modalCtrl.dismiss();
  }
}
