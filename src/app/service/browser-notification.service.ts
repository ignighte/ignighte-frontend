import { Injectable } from '@angular/core';

// Declare window var
let _window: any = window;

@Injectable()
export class BrowserNotificationService {

  // create private vars for public functions
  private notificationSupport;
  private enabled = false;

  // Constructor with Notification
  constructor() {
    this.notificationSupport = (<any>window)
    .Notification && (<any>Notification)
    .permission !== 'denied' ? true : false;
   }

  // request for permission to and if it is granted
  // change enabled to true
   async checkNotification(): Promise<any> {
     if (!this.enabled) {
       return Notification.requestPermission((result) => {
         return result === 'granted' ? (
           this.enabled = true
         ) : false;
       });
     }
   }

  // simply change enable to false for disabling
   public disable(): void {
     this.enabled = false;
   }

  //  Display the information on song playing
  // show nothing if notification is disabled.
   public show(name: string): void {
     if (!this.notificationSupport || !this.enabled) {
       return;
     }
  // If not, display the song name
     Notification.requestPermission((status) => {
       let displayInfo = new Notification('Now Playing', {
         body: name
       });
     });
   }


}
