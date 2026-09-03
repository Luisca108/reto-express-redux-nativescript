import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { alert } from "@nativescript/core/ui/dialogs";

import { SettingsService } from "../../services/settings.service";

@Component({
  selector: "ns-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.css"]
})
export class SettingsComponent implements OnInit {
  usernameDraft = "";

  constructor(
    private readonly routerExtensions: RouterExtensions,
    private readonly settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.usernameDraft = this.settingsService.username;
  }

  save(): void {
    this.settingsService.saveUsername(this.usernameDraft);
    alert("Nombre guardado con ApplicationSettings.");
    this.routerExtensions.navigate(["/"], { clearHistory: true });
  }
}
