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
import { RouterLink } from '@angular/router';
import { DiaryTaskModalPage } from '../diary-task-modal/diary-task-modal.page';

import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.page.html',
  styleUrls: ['./diary.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, DiaryModalPage, RouterLink],
})
export class DiaryPage implements OnInit {
  selectTabs: string = 'notes'; // set the default tab
  notes: any = []; // array of notes

  checked: boolean = false; // set the default value of the checked property to false
  tasks: any = []; // array of tasks
  doneTasks: any = []; // array of done tasks

  // Ion Reorder Group Event referred from original ionic documentation
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // The `from` and `to` properties contain the index of the item
    // when the drag started and ended, respectively
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);

    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    ev.detail.complete();
  }

  constructor(
    private diaryDataService: DiaryDataService,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) {
    this.diaryDataService.getNotes().subscribe((res) => {
      // get the notes from the diary data service
      // console.log(res);
      // subscribe to the notes observable
      this.notes = res; // assign the notes property to the array of notes returned by the observable
    });

    this.diaryDataService.getTasks().subscribe((res) => {
      // get the tasks from the diary data service
      // console.log(res);
      // subscribe to the tasks observable
      this.tasks = res; // assign the tasks property to the array of tasks returned by the observable
    });

    this.diaryDataService.getDoneTasks().subscribe((res) => {
      // get the done tasks from the diary data service
      // console.log(res);
      // subscribe to the done tasks observable
      this.doneTasks = res; // assign the done tasks property to the array of done tasks returned by the observable
    });
  }

  ngOnInit() {}

  async openNote(note: any) {
    // open the note
    const modal = await this.modalCtrl.create({
      // create a modal
      component: DiaryModalPage, // set the modal component
      componentProps: { id: note.id }, // pass the id of the note to the modal
      breakpoints: [0, 0.75, 1], // set the breakpoints
      initialBreakpoint: 0.75, // set the initial breakpoint
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
            // const timestamp = new Date().getTime(); // get current timestamp
            //get the current date and time
            //create a standard date time format
            const standardDateTimeFormat = new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });

            const currentDate = new Date(); // get the current date and time

            const timestamp = standardDateTimeFormat.format(currentDate); // format the date and time to a standard format and assign it to the timestamp variable

            this.diaryDataService.addNote({
              title: note.title,
              text: note.text,
              timestamp: timestamp, // add timestamp property to the note object
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

  //open task modal to update task details
  async openTask(task: any) {
    // open the task
    const modal = await this.modalCtrl.create({
      // create a modal
      component: DiaryTaskModalPage, // set the modal component
      componentProps: { id: task.id }, // pass the id of the task to the modal
      breakpoints: [0, 0.75, 1], // set the breakpoints
      initialBreakpoint: 0.75, // set the initial breakpoint
    }); // create a modal

    modal.present(); // present the modal
  }

  // add new task to the list
  async addTask() {
    // add a task via alert controller
    const alert = await this.alertCtrl.create({
      // create an alert
      header: 'Add Task', // set the header
      inputs: [
        // array of inputs
        {
          name: 'title', // input name
          type: 'text', // input type
          placeholder: 'Enter Your Task Title', // input placeholder
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
          handler: (task) => {
            // button handler
            // console.log(task);
            // const timestamp = new Date().getTime(); // get current timestamp
            //get the current date and time
            //create a standard date time format
            const standardDateTimeFormat = new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            });

            const currentDate = new Date(); // get the current date and time

            const timestamp = standardDateTimeFormat.format(currentDate); // format the date and time to a standard format and assign it to the timestamp variable

            this.diaryDataService.addTask({
              title: task.title,
              text: task.text,
              timestamp: timestamp, // add timestamp property to the note object
              done: false, // set the done property to false
            }); // add the task to the firestore

            // console.log(task);
            const toast = this.toastCtrl.create({
              // create a toast
              message: 'Task Added', // set the message
              duration: 2000, // set the duration
            }); // create a toast
            toast.then((toast) => toast.present()); // present the toast
          },
        },
      ],
    }); // create an alert
    alert.present(); // present the alert
  }

  // delete a task from the list
  async deleteTask() {}

  // update the done property of the task
  async toggleDone(id: string, event: any) {
    // console.log(id);
    // console.log(event.detail.checked); // get the checked property of the event
    this.diaryDataService.updateTaskById(id, event); // update the done property of the task

    //create a toast saying the task is completed

    if (event.detail.checked == true) {
      // if the task is marked as done create a toast saying the task is completed
      const toast = this.toastCtrl.create({
        // create a toast
        message: 'Task Completed', // set the message
        duration: 2000, // set the duration
      }); // create a toast
      toast.then((toast) => toast.present()); // present the toast
    } else if (event.detail.checked == false) {
      // if the task is marked as undone create a toast saying the task is undone
      const toast = this.toastCtrl.create({
        // create a toast
        message: 'Task Pending', // set the message
        duration: 2000, // set the duration
      }); // create a toast
      toast.then((toast) => toast.present()); // present the toast
    }
  }

  //clear all completed tasks from completed tasks list
  clearAllCheckedTasks() {
    this.diaryDataService.deleteDoneTasks(); // delete all the tasks that are marked as done
    const toast = this.toastCtrl.create({
      // create a toast
      message: 'All Completed Tasks Cleared', // set the message
      duration: 2000, // set the duration
    }); // create a toast
    toast.then((toast) => toast.present()); // present the toast
  }
}
