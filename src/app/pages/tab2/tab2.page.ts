import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { OnInit } from '@angular/core';

// import student service
import { StudentServiceService } from '../../services/student-service.service';

// Always remember to import CommonModule in new version7 of ionic to make ngFor work otherwise common directives like ngFor and ngIf won't work
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab2Page implements OnInit {
  // create 2 variables to store results emitted from observable
  students: any;
  newStudents: any;

  // inject student service into the constructor
  constructor(private studentService: StudentServiceService) {}

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
}
