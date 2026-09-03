import { HttpClientModule } from "@angular/common/http";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule, NativeScriptModule, NativeScriptRouterModule } from "@nativescript/angular";
import { StoreModule } from "@ngrx/store";

import { AppComponent } from "./app.component";
import { routes } from "./app.routes";
import { FavoritesComponent } from "./screens/favorites/favorites.component";
import { HomeComponent } from "./screens/home/home.component";
import { SearchComponent } from "./screens/search/search.component";
import { SettingsComponent } from "./screens/settings/settings.component";
import { readingReducer } from "./store/reading.reducer";

@NgModule({
  declarations: [
    AppComponent,
    FavoritesComponent,
    HomeComponent,
    SearchComponent,
    SettingsComponent
  ],
  bootstrap: [AppComponent],
  imports: [
    HttpClientModule,
    NativeScriptFormsModule,
    NativeScriptModule,
    NativeScriptRouterModule.forRoot(routes),
    StoreModule.forRoot({ reading: readingReducer })
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
