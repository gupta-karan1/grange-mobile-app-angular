import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class StudentCreateService {
  // create a variable to hold the url to json create students php file
  urlCreateStudents =
    'http://localhost:8888/php_ionic/json-create-students.php';

  constructor(private http: HttpClient) {}

  //create a post data function to send data to the json create students php file
  postData(data: any) {
    return this.http.post(this.urlCreateStudents, data, {
      headers: new HttpHeaders({
        Accept: 'text/plain',
        'Content-Type': 'text/plain',
      }),
      responseType: 'text',
    });
  }
}
