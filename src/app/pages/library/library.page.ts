import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  InfiniteScrollCustomEvent,
  IonicModule,
  LoadingController,
} from '@ionic/angular';
import { LibraryService } from 'src/app/services/library.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class LibraryPage implements OnInit {
  books: any[] = [];
  currentPage = 1;

  constructor(
    private libraryService: LibraryService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  async loadBooks(event?: any) {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'circular',
    });

    await loading.present();

    this.libraryService.getBooks(this.currentPage).subscribe((res) => {
      loading.dismiss();
      this.books.push(...res.results);
      console.log(res.results);

      //below code is to disable the infinite scroll when all the pages are loaded
      event?.target.complete(); // optional chaining operator (?.) to guard against a null value in the event parameter
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage; // if the total_pages is equal to the current page, then disable the infinite scroll
      }
    });
  }

  // infinite scroll to load more data
  loadData(event: InfiniteScrollCustomEvent) {
    // InfiniteScrollCustomEvent is a custom event type that is emitted by the infinite scroll component when it is triggered
    this.currentPage++; // increment the current page
    this.loadBooks(event); // call the loadBooks() method
  }
}
