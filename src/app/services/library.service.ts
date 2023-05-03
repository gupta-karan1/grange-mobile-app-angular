import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface ApiResult {
  page: number;
  results: any;
  total_pages: number;
  total_results: number;
}
@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  constructor(private http: HttpClient) {}

  getBooks(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`https://gutendex.com/books?page=${page}`);
  }

  getBook(id: any) {
    return this.http.get(`https://gutendex.com/books/${id}`);
  }
}
