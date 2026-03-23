import { Component, inject } from '@angular/core';
import { IconService } from './shared/services/icon/icon.service';
import { ThemeManagerService } from './shared/services/theme/theme-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  themeManager: ThemeManagerService = inject(ThemeManagerService);

  /**
   * Location - to get path/url
   */
  constructor(iconsService: IconService) {
    iconsService.registerIcons();
  }
}
