import { Routes } from "@angular/router";

import { FavoritesComponent } from "./screens/favorites/favorites.component";
import { HomeComponent } from "./screens/home/home.component";
import { SearchComponent } from "./screens/search/search.component";
import { SettingsComponent } from "./screens/settings/settings.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "search", component: SearchComponent },
  { path: "favorites", component: FavoritesComponent },
  { path: "settings", component: SettingsComponent }
];
