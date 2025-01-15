import { Component, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [NgIf, AsyncPipe],
})
export class FooterComponent {
  protected themeConfiguration = environment.ThemeConfiguration;

  authService = inject(AuthService);
  version: string = environment.APP_VERSION;
  currentYear = new Date().getFullYear();
}
