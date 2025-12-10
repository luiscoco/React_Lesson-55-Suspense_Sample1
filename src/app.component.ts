import { Component, Type } from '@angular/core';
import { CommonModule, NgComponentOutlet } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./App.css']
})
export class AppComponent {
  version = 0;
  ProfileComponent: Type<any> | null = null;
  loading = false;

  constructor() {
    this.loadProfile();
  }

  reloadProfile() {
    this.version++;
    this.ProfileComponent = null;
    this.loadProfile();
  }

  private async loadProfile() {
    this.loading = true;
    await this.wait(1200);
    const module = await import('./profile.component');
    this.ProfileComponent = module.ProfileComponent;
    this.loading = false;
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
