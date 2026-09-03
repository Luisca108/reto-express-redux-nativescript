import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { Book } from "../models/book";

@Injectable({ providedIn: "root" })
export class FavoritesService {
  private readonly favoritesSubject = new BehaviorSubject<Book[]>([]);
  readonly favorites$ = this.favoritesSubject.asObservable();

  get snapshot(): Book[] {
    return this.favoritesSubject.value;
  }

  add(book: Book): void {
    const alreadyExists = this.snapshot.some((favorite) => favorite.id === book.id);

    if (!alreadyExists) {
      this.favoritesSubject.next([book, ...this.snapshot]);
    }
  }

  isFavorite(bookId: number): boolean {
    return this.snapshot.some((favorite) => favorite.id === bookId);
  }
}
