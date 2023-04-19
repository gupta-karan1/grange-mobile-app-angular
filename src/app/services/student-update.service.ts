import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student } from 'src/app/services/student-service.service';

@Injectable({
  providedIn: 'root',
})
export class StudentUpdateService {
  urlStudents = environment.urlStudents;

  constructor(private http: HttpClient) {}

  // created  a method to get only the object from modules array that has the moduleNo property that matches the moduleNo parameter
  // this will create a details page for each module
  //using angular pipe to filter the data
  getStudentDetails(studentID: string): Observable<Student> {
    return this.http.get<Student>(this.urlStudents).pipe(
      map((result) => {
        // map the result to a new array of objects
        let student = result['students'].filter(
          (s: any) => s.studentID == studentID // filter the array of objects to return only the object that has the moduleNo property that matches the moduleNo parameter
        );
        return student && student.length ? student[0] : null; // return the first object in the array
      })
    );
  }

  // urlUpdateStudents = 'http://localhost:8888/php_ionic/json-update-student.php';
  urlUpdateStudents = environment.urlUpdateStudents;

  updateStudent(id: any, data: any) {
    // create a function called updateStudent that will subscribe to the updateStudentService and update student details in the database
    return this.http.put(this.urlUpdateStudents + '?id=' + id, data, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }
}
