import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  //import environment variable for gutenbergUrl
  gutenbergUrl = environment.gutenbergUrl;

  getBooks(page = 1): Observable<ApiResult> {
    return this.http.get<ApiResult>(`${this.gutenbergUrl}?page=${page}`);
  }

  getBook(id: any) {
    return this.http.get(`${this.gutenbergUrl}/${id}`);
  }
}
