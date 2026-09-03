import { Injectable } from "@angular/core";
import { ApplicationSettings } from "@nativescript/core";
import { BehaviorSubject } from "rxjs";

const usernameKey = "username";

@Injectable({ providedIn: "root" })
export class SettingsService {
  private readonly usernameSubject = new BehaviorSubject<string>(
    ApplicationSettings.getString(usernameKey, "Estudiante")
  );

  readonly username$ = this.usernameSubject.asObservable();

  get username(): string {
    return this.usernameSubject.value;
  }

  saveUsername(username: string): void {
    const cleanName = username.trim() || "Estudiante";
    ApplicationSettings.setString(usernameKey, cleanName);
    this.usernameSubject.next(cleanName);
  }
}
