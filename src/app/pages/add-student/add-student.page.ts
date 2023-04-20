import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Student } from './../../services/student-service.service';
import { ModalController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

//import student create service
import { StudentCreateService } from '../../services/student-create.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.page.html',
  styleUrls: ['./add-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AddStudentPage implements OnInit {
  //create newStudent property from Student Interface
  // this will be used to store the data from the form
  // and will be passed to the student service
  // to be added to the database
  // the property is of type Student
  // and is initialized with empty strings
  //otherwise the form will throw an error
  newStudent: Student = {
    courseID: '',
    firstName: '',
    lastName: '',
    moduleNo1: '',
    moduleNo2: '',
    studentID: '',
  };

  constructor(
    private modalCtrl: ModalController, // inject the modal controller
    private studentCreateService: StudentCreateService, // inject the student create service
    private toastCtrl: ToastController // inject the toast controller
  ) {}

  ngOnInit() {}

  addStudent() {
    this.studentCreateService.postData(this.newStudent).subscribe(
      (res) => {
        console.log('Success: Student Record is added' + res); // this is the response from the server
        this.dismiss(true); // dismiss the modal and return true
        this.showToast('Student Record is added'); // show a toast message
      },
      async (err) => {
        console.log('Error: Student Record is not added' + err); // this is the response from the server
        this.dismiss(false); // dismiss the modal and return false
        this.showToast('Student Record is not added'); // show a toast message
      }
    );

    // if there is no input in the form, alert the user to add a student record
    if (
      this.newStudent.courseID === '' ||
      this.newStudent.firstName === '' ||
      this.newStudent.lastName === '' ||
      this.newStudent.moduleNo1 === '' ||
      this.newStudent.moduleNo2 === '' ||
      this.newStudent.studentID === ''
    ) {
      alert('You did not enter all fields. Please add a student record');
      this.dismiss(false); // dismiss the modal and return false
    }
  }

  // create a method to dismiss the modal
  dismiss(returnStudent: boolean) {
    if (returnStudent) {
      // if the student is added to the database
      this.modalCtrl.dismiss(this.newStudent); // return the newStudent object
    } else {
      // if the student is not added to the database
      this.modalCtrl.dismiss(); // dismiss the modal
    }
  }

  // create a method to show a toast message
  async showToast(message: string) {
    // the message is passed as a parameter
    const toast = await this.toastCtrl.create({
      // create a toast
      message: message, // set the message
      duration: 2000, // set the duration
    });
    toast.present(); // present the toast
  }
}
