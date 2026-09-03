import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { Book } from "../../models/book";
import { SettingsService } from "../../services/settings.service";
import { AppState } from "../../store/reading.reducer";
import { selectReadingItems } from "../../store/reading.selectors";

@Component({
  selector: "ns-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  readingItems: Book[] = [];
  username = "Estudiante";

  private readonly subscriptions = new Subscription();

  constructor(
    private readonly routerExtensions: RouterExtensions,
    private readonly settingsService: SettingsService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.settingsService.username$.subscribe((username) => {
        this.username = username;
      })
    );

    this.subscriptions.add(
      this.store.select(selectReadingItems).subscribe((items) => {
        this.readingItems = items;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goToSearch(): void {
    this.routerExtensions.navigate(["/search"], { animated: true });
  }

  goToFavorites(): void {
    this.routerExtensions.navigate(["/favorites"], { animated: true });
  }

  goToSettings(): void {
    this.routerExtensions.navigate(["/settings"], { animated: true });
  }
}
