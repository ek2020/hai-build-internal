import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  private toastSubject = new Subject<any>();
  private id = 0;

  constructor() {}

  getToasts(): Observable<any> {
    return this.toastSubject.asObservable();
  }

  showToast(type: string, message: string) {
    this.id++;  // Increment the ID to ensure it's unique for every toast
    this.toastSubject.next({ id: this.id, type, message });
  }

  showSuccess(message: string) {
    this.showToast('success', message);
  }

  showError(message: string) {
    this.showToast('error', message);
  }

  showInfo(message: string) {
    this.showToast('info', message);
  }
  
  showWarning(message: string) {
    this.showToast('warning', message);
  }
}
