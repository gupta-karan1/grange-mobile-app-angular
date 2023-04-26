import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DiaryDataService } from 'src/app/services/diary-data.service';
import { ModalController, ToastController } from '@ionic/angular';
import { Input } from '@angular/core';
import { Task } from 'src/app/services/diary-data.service';

@Component({
  selector: 'app-diary-task-modal',
  templateUrl: './diary-task-modal.page.html',
  styleUrls: ['./diary-task-modal.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DiaryTaskModalPage implements OnInit {
  @Input() id!: string; // id of the task taken from the modal component props
  // input decorator is used here to pass the id of the task to the modal component
  task!: Task; // task object

  constructor(
    private diaryDataService: DiaryDataService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.diaryDataService.getTaskById(this.id).subscribe((res) => {
      this.task = res; // assign the task property to the task returned by the observable
    });
  }

  //update the task details
  async updateTask() {
    this.diaryDataService.updateSingleTaskById(this.task); // update the task
    //create a toast
    const toast = await this.toastCtrl.create({
      message: 'Task Updated', // set the message
      duration: 2000, // set the duration
    });
    toast.present(); // present the toast
    this.modalCtrl.dismiss(); // dismiss the modal
  }

  //delete the task
  async deleteTask() {
    await this.diaryDataService.deleteTaskById(this.task);
    //create a toast
    const toast = await this.toastCtrl.create({
      message: 'Task Deleted', // set the message
      duration: 2000, // set the duration
    });
    toast.present(); // present the toast
    this.modalCtrl.dismiss(); // dismiss the modal
  }
}
