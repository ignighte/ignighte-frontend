import { Component, Input, AfterContentInit, Output, EventEmitter} from '@angular/core';
import { YoutubePlayerService } from '../../service/youtube-player.service';
import { NotificationService } from '../../service/notification.service';
import { BrowserNotificationService } from '../../service/browser-notification.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements AfterContentInit {

  // video functionality
  public minPlayer = true;
  public superMinPlayer = false;
  public playingEvent = 'pause';
  public shuffle = false;
  public repeat = false;
  public fullscreenActive = false;
  public currentVideoText = 'None';
  public notifications = false;

  @Output() repeatActive = new EventEmitter();
  @Output() shuffleActive = new EventEmitter();
  @Output() nextVideoEvent = new EventEmitter();
  @Output() prevVideoEvent = new EventEmitter();
  @Output() playFirstInPlaylist = new EventEmitter();
  @Output() clearPlaylist = new EventEmitter();
  @Output() exportPlaylist = new EventEmitter();
  @Output() importPlaylist = new EventEmitter();
  @Output() closePlaylist = new EventEmitter();

  constructor(
    private youtubePlayer: YoutubePlayerService,
    private notificationService: NotificationService,
    private browserNotification: BrowserNotificationService
  ) {
    this.youtubePlayer.playPauseEvent.subscribe(event => this.playingEvent = event);
    this.youtubePlayer.currentVideoText.subscribe(event => this.currentVideoText = event || 'None');
  }

  // AfterContentInit
  ngAfterContentInit() {
    let doc = window.document;
    let playerApi = doc.createElement('script');
    playerApi.type = 'text/javascript';
    playerApi.src = 'https://www.youtube.com/iframe_api';
    doc.body.appendChild(playerApi);

    this.youtubePlayer.createPlayer();
  }

  // Display Full Screen save for navbar and playlist
  toggleFullscreen(): void {
    this.minPlayer = false;
    this.superMinPlayer = false;
    this.fullscreenActive = !this.fullscreenActive;
    let width = this.fullscreenActive ? window.innerWidth - 70 : 440;
    let height = this.fullscreenActive ? window.innerHeight - 120 : 250;
    this.youtubePlayer.resizePlayer(width, height);
  }

  // play and pause video in in-app player
  playPause(event: string): void {
    this.playingEvent = event;
    if (!this.youtubePlayer.getCurrentVideo()) {
      this.playFirstInPlaylist.emit();
      return;
    }
    event === 'pause' ? this.youtubePlayer.pausePlayingVideo() : this.youtubePlayer.playPausedVideo();
  }

  // emitting events
  nextVideo(): void {
    this.nextVideoEvent.emit();
  }

  prevVideo(): void {
    this.prevVideoEvent.emit();
  }

  // Player Size Control
  togglePlayer(): void {
    this.minPlayer = !this.minPlayer;
    this.superMinPlayer = false;
  }

  minimizePlayer(): void {
    this.superMinPlayer = !this.superMinPlayer;
  }

  // Player Bar
  toggleRepeat(): void {
    this.repeat = !this.repeat;
    this.shuffle = false;
    this.repeatActive.emit(this.repeat);
  }

  toggleShuffle(): void {
    this.shuffle = !this.shuffle;
    this.repeat = false;
    this.shuffleActive.emit(this.shuffle);
  }

  // playlist actions
  openClosedPlaylist(): void {
    this.closePlaylist.emit();
  }

  clearPlaylistAction(): void {
    this.clearPlaylist.emit();
  }

  exportPlaylistAction(): void {
    this.exportPlaylist.emit();
  }

  importPlaylistAction(): void {
    let import_button = document.getElementById('import_button');
    import_button.click();
  }

  // temp function for importing JSON
  handleInputChange(e: any): void {
    console.log('begining of file');
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (file.name.split('.').pop() !== 'json') {
      this.notificationService.showNotification('File not supported.');
      return;
    }

    console.log('at reader');
    let reader = new FileReader();
    let me = this;

    reader.readAsText(file);
    reader.onload = function (ev) {
      let list;
      console.log('loaded');      
      try {
        list = JSON.parse(ev.target['result']);
      } catch (exc) {
        list = null;
      }
      if (!list || list.length < 1) {
        me.notificationService.showNotification('Playlist not valid.');
        return;
      }

      me.importPlaylist.emit(list);
      me.notificationService.showNotification('Playlist imported.');
      document.getElementById('import_button')['value'] = '';
    }
  }

  // Notification
  toggleNotifications(): void {
    this.notifications ?
      (
        this.notifications = false,
        this.browserNotification.disable()
      ) :
      this.browserNotification.checkNotification().then(async res => {
        this.notifications = res === 'granted' ? true : (
          this.notificationService.showNotification('Browser notifications blocked.'),
          false
        );
      });
  }

}
