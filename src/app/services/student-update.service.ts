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
  urlUpdateStudents = 'http://localhost:8888/php_ionic/json-update-student.php';
  urlStudents = environment.urlStudents;

  constructor(private http: HttpClient) {}

  // created  a method to get only the object from modules array that has the moduleNo property that matches the moduleNo parameter
  // this will create a details page for each module
  //using angular pipe to filter the data
  getStudentDetails(studentID: string): Observable<Student> {
    return this.http.get<Student>(this.urlStudents).pipe(
      map((result) => {
        let student = result['students'].filter(
          (s: any) => s.studentID == studentID
        );
        return student && student.length ? student[0] : null;
      })
    );
  }

  updateStudent(id: any) {
    console.log(id);
    return this.http.put(this.urlUpdateStudents + '?id=' + id, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }
}
