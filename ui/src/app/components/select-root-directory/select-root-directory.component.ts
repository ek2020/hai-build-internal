import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgIconComponent } from '@ng-icons/core';
import { environment } from 'src/environments/environment';
import { APP_CONSTANTS } from '../../constants/app.constants';
import { NgIf } from '@angular/common';
import { ButtonComponent } from '../core/button/button.component';

@Component({
  selector: 'app-select-root-directory',
  templateUrl: './select-root-directory.component.html',
  styleUrls: ['./select-root-directory.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgIconComponent, ButtonComponent],
})
export class SelectRootDirectoryComponent {
  workingDir: string | null;
  appName = environment.ThemeConfiguration.appName;

  constructor(private modalRef: MatDialogRef<SelectRootDirectoryComponent>) {
    this.workingDir = localStorage.getItem(APP_CONSTANTS.WORKING_DIR);
  }

  openFolderSelector() {
    this.modalRef.close(true);
  }

  closeModal() {
    this.modalRef.close(false);
  }
}
