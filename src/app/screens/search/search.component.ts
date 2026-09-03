import { Component } from "@angular/core";
import { alert } from "@nativescript/core/ui/dialogs";

import { Book } from "../../models/book";
import { BookApiService } from "../../services/book-api.service";
import { FavoritesService } from "../../services/favorites.service";

@Component({
  selector: "ns-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent {
  books: Book[] = [];
  query = "";
  isLoading = false;

  constructor(
    private readonly bookApiService: BookApiService,
    private readonly favoritesService: FavoritesService
  ) {}

  search(): void {
    this.isLoading = true;

    this.bookApiService.searchBooks(this.query).subscribe({
      next: (books) => {
        this.books = books;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        alert("No se pudo conectar con la API Express. Revisa app.config.ts y tu URL de Ngrok.");
      }
    });
  }

  addFavorite(book: Book): void {
    this.favoritesService.add(book);
    alert(`Favorito guardado: ${book.title}`);
  }

  isFavorite(book: Book): boolean {
    return this.favoritesService.isFavorite(book.id);
  }
}
