import { Component, OnDestroy, OnInit } from "@angular/core";
import { alert } from "@nativescript/core/ui/dialogs";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { Book } from "../../models/book";
import { FavoritesService } from "../../services/favorites.service";
import { readNow } from "../../store/reading.actions";
import { AppState } from "../../store/reading.reducer";

@Component({
  selector: "ns-favorites",
  templateUrl: "./favorites.component.html",
  styleUrls: ["./favorites.component.css"]
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favorites: Book[] = [];

  private subscription?: Subscription;

  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscription = this.favoritesService.favorites$.subscribe((favorites) => {
      this.favorites = favorites;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  readNow(book: Book): void {
    this.store.dispatch(readNow({ book }));
    alert(`Enviado al store Redux: ${book.title}`);
  }
}
