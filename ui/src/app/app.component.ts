import { Component, inject, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';
import { ElectronService } from './services/electron/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  electronService = inject(ElectronService);
  logger = inject(NGXLogger);
  router = inject(Router);

  ngOnInit() {
    if (sessionStorage.getItem('serverActive') !== 'true') {
      this.electronService
        .listenPort()
        .then(() => {
          // Success logic if needed
        })
        .catch((error) => {
          this.logger.error('Error listening to port', error);
          alert('An error occurred while trying to listen to the port.');
        });
    }
  }
}
