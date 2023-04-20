import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddStudentPage } from '../add-student/add-student.page';
import { ToastController } from '@ionic/angular';

// import student service
import { StudentServiceService } from '../../services/student-service.service';

//import delete student service
import { StudentDeleteService } from '../../services/student-delete.service';

// import update student service
import { StudentUpdateService } from '../../services/student-update.service';

// Always remember to import CommonModule in new version7 of ionic to make ngFor work otherwise common directives like ngFor and ngIf won't work
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UpdateStudentPage } from '../update-student/update-student.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    AddStudentPage,
    RouterLink,
    UpdateStudentPage,
  ],
})
export class Tab2Page implements OnInit {
  // create 2 variables to store results emitted from observable
  students: any;
  newStudents: any;

  // inject student service into the constructor
  constructor(
    private studentService: StudentServiceService,
    private modalCtrl: ModalController,
    private studentDeleteService: StudentDeleteService,
    private studentUpdateService: StudentUpdateService,
    private toastCtrl: ToastController
  ) {}

  // create a method to get the data from the json-data-students.php file
  getStudentData() {
    // subscribe to the observable
    // result is the data emitted from the observable
    this.studentService.getStudents().subscribe((result) => {
      // store the data emitted from the observable into the students variable
      this.students = result;
      console.log(this.students);

      // store the data emitted from the observable into the newStudents variable
      this.newStudents = this.students.students;
    });
  }

  // call the getStudentData() method when the page loads
  ngOnInit() {
    // call the getStudentData() method
    this.getStudentData();
  }

  // create a method to open the modal
  async openModal() {
    // create the modal
    const modal = await this.modalCtrl.create({
      component: AddStudentPage,
    });

    modal.onDidDismiss().then((data) => {
      //check if data is returned
      // if not the modal was cancelled
      // using a top back button
      if (data['data']) {
        this.newStudents.push(data['data']);
      } else {
        console.log('Modal was cancelled');
      }
    });

    return await modal.present();
  }

  // create a method to delete a student
  deleteStudent(id: any) {
    this.studentDeleteService.deleteStudent(id).subscribe(
      (result) => {
        console.log('SUCCESS');
        // call the getStudentData() method
        this.getStudentData();
        this.showToast('Student Record is deleted');
      },
      (error) => {
        console.log('ERROR');
        this.showToast('Student Record is not deleted');
      }
    );
  }

  // create a method to show toast message
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
