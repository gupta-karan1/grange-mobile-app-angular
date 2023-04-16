import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Student {
  courseID: string;
  firstName: string;
  lastName: string;
  moduleNo1: string;
  moduleNo2: string;
  studentID: string;
}

@Injectable({
  providedIn: 'root',
})
export class StudentServiceService {
  // create url variable to hold the php_ionic json-data-students.php file
  urlStudents = 'http://localhost:8888/php_ionic/json-data-students.php';

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}

  // create a method to get the data from the json-data-students.php file
  getStudents(): Observable<any> {
    // return type is Observable<any>
    return this.http.get(this.urlStudents);
  }
}
