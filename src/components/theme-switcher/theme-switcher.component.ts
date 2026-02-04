import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  imports: [CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  switch = signal(localStorage.getItem('theme') === 'dark');
  setSwitch() {
    this.switch.set(!this.switch());
  }
  toggleDarkMode() {
    const element = document.querySelector('html');
    let dark = true;
    if (element) {
      dark = element.classList.toggle('my-app-dark');
    }
    if (dark) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  constructor(private cdref: ChangeDetectorRef) {}
}
