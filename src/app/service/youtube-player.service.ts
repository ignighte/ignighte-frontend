// The backend is most likely not going to finish in time;
// Just create and store player object to display video

import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';
import { BrowserNotificationService } from './browser-notification.service';

let _window: any = window;

@Injectable()
export class YoutubePlayerService {
  // set player and video id var for storage
  public yt_player;
  private currentVideoId: string;

  // Event Emitters on output for song select, pause, and display
  @Output() videoChangeEvent: EventEmitter<any> = new EventEmitter(true);
  @Output() playPauseEvent: EventEmitter<any> = new EventEmitter(true);
  @Output() currentVideoText: EventEmitter<any> = new EventEmitter(true);

  // have notification on build
  constructor(
    public notificationService: NotificationService,
    public browserNotification: BrowserNotificationService
  ) { }

  // main function to create the youtube player in app
  createPlayer(): void {
    let interval = setInterval(() => {
      if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
        this.yt_player = new _window.YT.Player('yt-player', {
          width: '440',
          height: '250',
          margin: '1rem 1rem 1rem 1rem',
          playerVars: {
            iv_load_policy: '3',
            rel: '0'
          },
          events: {
            onStateChange: (ev) => {
              this.onPlayerStateChange(ev);
            }
          }
        });
        clearInterval(interval);
      }
    }, 100);
  }

  // Implement play-pasue event
  onPlayerStateChange(event: any) {
    const state = event.data;
    // start off by pasued state
    switch (state) {
      case 0:
        this.videoChangeEvent.emit(true);
        this.playPauseEvent.emit('pause');
        break;
      case 1:
        this.playPauseEvent.emit('play');
        break;
      case 2:
        this.playPauseEvent.emit('pause');
        break;
    }
  }

  // util functions for video player
  playVideo(videoId: string, videoText?: string): void {
    if (!this.yt_player) {
      this.notificationService.showNotification('Player not ready.');
      return;
    }
    this.yt_player.loadVideoById(videoId);
    this.currentVideoId = videoId;
    this.currentVideoText.emit(videoText);
    this.browserNotification.show(videoText);
  }

  pausePlayingVideo(): void {
    this.yt_player.pauseVideo();
  }

  playPausedVideo(): void {
    this.yt_player.playVideo();
  }

  getCurrentVideo(): string {
    return this.currentVideoId;
  }

  resizePlayer(width: number, height: number) {
    this.yt_player.setSize(width, height);
  }

  getShuffled(index: number, max: number): number {
    if (max < 2) {
      return;
    }

    let i = Math.floor(Math.random() * max);
    return i !== index ? i : this.getShuffled(index, max);
  }

}
