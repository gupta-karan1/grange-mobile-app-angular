import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { LecturerServiceService } from '../../services/lecturer-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class Tab3Page implements OnInit {
  // create 2 variables to store results emitted from observable
  lecturers: any;
  newLecturers: any;

  // inject student service into the constructor
  constructor(private lecturerService: LecturerServiceService) {}

  // create a method to get the data from the json-data-students.php file
  getLecturerData() {
    // subscribe to the observable
    // result is the data emitted from the observable
    this.lecturerService.getLecturers().subscribe((result) => {
      // store the data emitted from the observable into the lecturers variable
      this.lecturers = result;
      console.log(this.lecturers);

      // store the data emitted from the observable into the newLecturers variable
      this.newLecturers = this.lecturers.lecturers;
    });
  }

  // call the getLecturerData() method when the page loads
  ngOnInit() {
    // call the getLecturerData() method
    this.getLecturerData();
  }
}
