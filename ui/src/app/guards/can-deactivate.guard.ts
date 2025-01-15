import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { CONFIRMATION_DIALOG } from '../constants/app.constants';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';

// Define the interface for the component that can be deactivated
export interface CanComponentDeactivate {
  canDeactivate: () => boolean | Observable<boolean> | Promise<boolean>;
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private dialog: MatDialog) {}

  canDeactivate(
    component: CanComponentDeactivate
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (component.canDeactivate()) {
      return this.openDialog();
    }
    return true;
  }

  private openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '500px',
      data: {
        title: CONFIRMATION_DIALOG.UNSAVED_CHANGES.TITLE,
        description: CONFIRMATION_DIALOG.UNSAVED_CHANGES.DESCRIPTION,
        proceedButtonText:
          CONFIRMATION_DIALOG.UNSAVED_CHANGES.PROCEED_BUTTON_TEXT,
        cancelButtonText:
          CONFIRMATION_DIALOG.UNSAVED_CHANGES.CANCEL_BUTTON_TEXT,
      },
    });

    return dialogRef.afterClosed();
  }
}

// return component.canDeactivate ? component.canDeactivate() : true;