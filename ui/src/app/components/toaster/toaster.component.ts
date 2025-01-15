import { ChangeDetectorRef, Component } from '@angular/core';
import { ToasterService } from '../../services/toaster/toaster.service';
import { NgClass, NgForOf, NgIf } from '@angular/common';
import { NgIconComponent } from '@ng-icons/core';
import { heroCheckCircle, heroExclamationCircle, heroInformationCircle, heroExclamationTriangle } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss'],
  standalone: true,
  imports: [NgForOf, NgClass, NgIf, NgIconComponent],
  providers: [
    { provide: 'icons', useValue: { heroCheckCircle, heroExclamationCircle, heroInformationCircle, heroExclamationTriangle } }
  ]
})
export class ToasterComponent {
  toasts: any[] = [];

  constructor(
    private toasterService: ToasterService,
    private cdr: ChangeDetectorRef,
  ) {
    this.toasterService.getToasts().subscribe((toast) => {
      // Clear the previous toast (if any) to ensure only one toast is visible
      this.toasts = [toast];
      this.cdr.detectChanges();
      // Auto-remove the toast after 5 seconds
      setTimeout(() => {
        this.removeToast(toast.id);
        this.cdr.markForCheck();
      }, 5000); // 5 seconds timeout
    });
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((toast) => toast.id !== id);
  }
}
