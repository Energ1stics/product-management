import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css',
})
export class ThemeSelectorComponent {
  constructor(@Inject(DOCUMENT) private document: Document) {
    const localStorage = this.document.defaultView?.localStorage;
    if (localStorage) {
      const dark = localStorage.getItem('theme') === 'dark';
      this.setTheme(dark);
    }
  }

  get getIsDarkMode() {
    return this.isDarkMode;
  }

  private isDarkMode = false;

  toggleTheme() {
    this.setTheme(!this.isDarkMode);
  }

  setTheme(isDarkMode: boolean) {
    this.isDarkMode = isDarkMode;
    document.documentElement.classList.toggle('dark', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }
}
