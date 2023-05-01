import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SearchableSelectComponent } from 'src/app/components/searchable-select/searchable-select.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-search-students',
  templateUrl: './search-students.page.html',
  styleUrls: ['./search-students.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SearchableSelectComponent],
})
export class SearchStudentsPage implements OnInit {
  users = [];
  selectedUsers: any[] = [];
  constructor(private http: HttpClient) {
    this.loadUsers();
  }

  //https://jsonplaceholder.typicode.com/users

  ngOnInit() {}
  loadUsers() {
    this.http
      .get<any>('https://randomuser.me/api/?results=30&seed=karan') // getting users from random user api where seed allows us to get the same data every time
      .subscribe((data: any) => {
        // console.log(data);
        this.users = data.results;
        console.log(this.users);
      });
  }

  selectChanged(event: any) {
    console.log(event);
    this.selectedUsers = event;
  }
}
