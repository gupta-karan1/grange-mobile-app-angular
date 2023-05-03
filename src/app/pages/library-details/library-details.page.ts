import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LibraryService, ApiResult } from 'src/app/services/library.service';

@Component({
  selector: 'app-library-details',
  templateUrl: './library-details.page.html',
  styleUrls: ['./library-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class LibraryDetailsPage implements OnInit {
  book: any = {
    // initialize the book object with empty values for all the properties that are used in the template
    title: '',
    authors: [
      {
        name: '',
        birth_year: '',
        death_year: '',
      },
    ],
    subjects: [],
    download_count: 0,
    formats: {},
    bookshelves: [],
    languages: [],
    copyright: false,
    media_type: '',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private libraryService: LibraryService
  ) {}

  ngOnInit() {
    const id: any = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(id);
    this.libraryService.getBook(id).subscribe((res) => {
      this.book = res;
      console.log(res);
    });
  }

  downloadEPUBBook() {
    const url = this.book.formats['application/epub+zip'];
    // console.log(url);
    window.open(url);
  }

  readOnline() {
    const url = this.book.formats['text/html'];
    // console.log(url);
    window.open(url);
  }
}
