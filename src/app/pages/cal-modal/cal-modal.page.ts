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
    id: '',
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
}
