import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";

import { appConfig } from "../config/app.config";
import { Book, BookSearchResponse } from "../models/book";

@Injectable({ providedIn: "root" })
export class BookApiService {
  constructor(private readonly http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    const params = query.trim()
      ? new HttpParams().set("q", query.trim())
      : new HttpParams();

    return this.http
      .get<BookSearchResponse>(`${appConfig.apiBaseUrl}/api/books`, { params })
      .pipe(map((response) => response.items));
  }
}
