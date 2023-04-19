import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Student {
  email: string;
  firstName: string;
  lastName: string;
  moduleNo1: string;
  moduleNo2: string;
  staffNumber: string;
}

@Injectable({
  providedIn: 'root',
})
export class LecturerServiceService {
  // create url variable to hold the php_ionic json-data-students.php file
  // urlLecturers = 'http://localhost:8888/php_ionic/json-data-lecturers.php';
  urlLecturers = environment.urlLecturers;

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}

  // create a method to get the data from the json-data-students.php file
  getLecturers(): Observable<any> {
    // return type is Observable<any>
    return this.http.get(this.urlLecturers);
  }
}
