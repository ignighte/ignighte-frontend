import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  // Default timeout = 2000
  private timeoutDuration = 2000;

  constructor() { }

  public showNotification(message: string): void {
    let notification = document.querySelector('.mdl-js-snackbar');
    let data = {
      message: message,
      timeout: this.timeoutDuration
    };
    notification['MaterialSnackbar'].showSnackbar(data);
  }

}
