import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';

import { StudentUpdateService } from 'src/app/services/student-update.service';
import { ActivatedRoute } from '@angular/router';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-update-student',
  templateUrl: './update-student.page.html',
  styleUrls: ['./update-student.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class UpdateStudentPage implements OnInit {
  student: any = {};

  constructor(
    private studentUpdateService: StudentUpdateService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    const studentID: any =
      this.activatedRoute.snapshot.paramMap.get('studentID');
    console.log(studentID); // test
    this.studentUpdateService
      .getStudentDetails(studentID)
      .subscribe((result) => {
        console.log(result); // test
        this.student = result; // store the data emitted from the observable into the module variable
        // the module variable here is an individual object from the modules array
      });
  }

  // create a function called updateStudentDetails that will subscribe to the updateStudentService and update student details in the database
  updateStudentDetails(id: any, data: any) {
    this.studentUpdateService.updateStudent(id, data).subscribe(
      (res: any) => {
        console.log('Success: Student Record is updated' + res); // this is the response from the server
        console.log(res);
        // navigate to the tab2 page
        this.router.navigate(['/tabs/tab2']);
        // //reload the window to display the updated data
        // window.location.reload();
        // show the toast success message
        this.showToast('Student Record is updated');

        //reload the window after 3 seconds to display the updated data
        setTimeout(() => {
          window.location.reload();
        }, 2100);
      },
      async (err: any) => {
        console.log('Error: Student Record is not updated' + err); // this is the response from the server
        // show the toast error message
        this.showToast('Student Record is not updated');
      }
    );
  }

  // create a show toast method
  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }
}
