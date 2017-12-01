import { Component, Input, AfterContentInit, Output, EventEmitter} from '@angular/core';
import { YoutubePlayerService } from '../../service/youtube-player.service';


@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements AfterContentInit {

  // video functionality

  public playingEvent = 'pause';
  public shuffle = false;
  public repeat = false;
  public currentVideoText = 'None';

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
    private youtubePlayer: YoutubePlayerService
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

  clearPlaylistAction(): void {
    this.clearPlaylist.emit();
  }

  exportPlaylistAction(): void {
    this.exportPlaylist.emit();
    this.clearPlaylist.emit();
  }

  importPlaylistAction(): void {
    let import_button = document.getElementById('import_button');
    import_button.click();
  }

  // temp function for importing JSON -> we will rewrite the inputChange to read in from
  handleInputChange(e: any): void {
    console.log('begining of file input');
    let file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];

    if (file.name.split('.').pop() !== 'json') {
      alert('input Json')
      return;
    }

    let reader = new FileReader();
    let me = this;

    reader.readAsText(file);
    reader.onload = function (ev) {
      let list;
      try {
        list = JSON.parse(ev.target['result']);
      } catch (exc) {
        list = null;
      }
      if (!list || list.length < 1) {
        alert('Playlist not valid.');
        return;
      }

      me.importPlaylist.emit(list);
      document.getElementById('import_button')['value'] = '';
    }
  }
}
