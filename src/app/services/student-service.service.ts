import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Student {
  [key: string]: any; // using index signature to avoid error TS7017 (element implicitly has an 'any' type because type 'Student' has no index signature) in src\app\pages\student\student.page.ts (line 27)
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
  // create a variable to store the url of the json-data-students.php file
  urlStudents = environment.urlStudents;

  // Inject HttpClient into the constructor
  constructor(private http: HttpClient) {}

  // create a method to get the data from the json-data-students.php file
  getStudents(): Observable<any> {
    // return type is Observable<any>
    return this.http.get(this.urlStudents);
  }
}
