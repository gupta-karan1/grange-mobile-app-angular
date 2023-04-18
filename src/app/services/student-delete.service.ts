import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentDeleteService {
  urlDeleteStudents = 'http://localhost:8888/php_ionic/json-delete-student.php';

  constructor(private http: HttpClient) {}

  // create a delete method to delete student item data based on student id
  deleteStudent(id: any) {
    // console.log(id);
    return this.http.delete(this.urlDeleteStudents + '?id=' + id, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }
}
