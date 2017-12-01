import { Component, AfterViewInit } from '@angular/core';
import { YoutubeApiService } from '../../service/youtube-api.service';
import { YoutubePlayerService } from '../../service/youtube-player.service';
import { PlaylistStoreService } from '../../service/playlist-store.service';
import { Http, Headers, Response  } from '@angular/http';

  // Temp for localhost
  const posturl = 'http://54.68.90.169:8080/playlist';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.css']
})
export class VideoPageComponent implements AfterViewInit {

// page layout
  public videoList = [];
  public videoPlaylist = [];
  public loadingInProgress = false;
  public playlistToggle = false;
  public playlistNames = false;
  public repeat = false;
  public shuffle = false;
  public playlistElement: any;
  private pageLoadingFinished = false;

  // services
  constructor(
    private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService,
    private http: Http
  ) {
  }

  // AfterViewInit
  ngAfterViewInit() {
    this.playlistElement = document.getElementById('playlist');
  }

  // use playlist to start playing the video
  playFirstInPlaylist(): void {
    if (this.videoPlaylist[0]) {
      this.playlistElement.scrollTop = 0;
      this.youtubePlayer.playVideo(this.videoPlaylist[0].id, this.videoPlaylist[0].snippet.title);
    }
  }

  // assign searched video
  handleSearchVideo(videos: Array<any>): void {
    this.videoList = videos;
  }

  // add to playlist checked with availability and timeouts
  checkAddToPlaylist(video: any): void {
    if (!this.videoPlaylist.some((e) => e.id === video.id)) {
      this.videoPlaylist.push(video);
      this.playlistService.addToPlaylist(video);

      let inPlaylist = this.videoPlaylist.length - 1;

      setTimeout(() => {
        let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
        this.playlistElement.scrollTop = topPos - 100;
      });
    }
  }

  // Player functionality activate
  repeatActive(val: boolean): void {
    this.repeat = val;
    this.shuffle = false;
  }

  shuffleActive(val: boolean): void {
    this.shuffle = val;
    this.repeat = false;
  }

  nextVideo(): void {
    this.playPrevNext(true);
  }

  prevVideo(): void {
    this.playPrevNext(false);
  }

  searchMore(): void {
    if (this.loadingInProgress || this.pageLoadingFinished || this.videoList.length < 1) {
      return;
    }

    this.loadingInProgress = true;
    this.youtubeService.searchNext()
      .then(data => {
        this.loadingInProgress = false;
        if (data.length < 1 || data.status === 400) {
          setTimeout(() => {
            this.pageLoadingFinished = true;
            setTimeout(() => {
              this.pageLoadingFinished = false;
            }, 10000);
          })
          return;
        }
        data.forEach((val) => {
          this.videoList.push(val);
        });
      }).catch(error => {
        this.loadingInProgress = false;
      })
  }

  // player nav
  // Change this to more robust function later; it takes way too long with if
  playPrevNext(value): void {
    let current = this.youtubePlayer.getCurrentVideo();
    let inPlaylist;

    // Video Within Playlist
    this.videoPlaylist.forEach((video, index) => {
      if (video.id === current) {
        inPlaylist = index;
      }
    });

    if (inPlaylist !== undefined) {
      let topPos = document.getElementById(this.videoPlaylist[inPlaylist].id).offsetTop;
      if (this.shuffle) {
        let shuffled = this.videoPlaylist[this.youtubePlayer.getShuffled(inPlaylist, this.videoPlaylist.length)];
        this.youtubePlayer.playVideo(shuffled.id, shuffled.snippet.title);
        this.playlistElement.scrollTop = document.getElementById(shuffled.id).offsetTop - 100;
      } else {
        if (value) {
          if (this.videoPlaylist.length - 1 === inPlaylist) {
            this.youtubePlayer.playVideo(this.videoPlaylist[0].id, this.videoPlaylist[0].snippet.title);
            this.playlistElement.scrollTop = 0;
          } else {
            this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist + 1].id, this.videoPlaylist[inPlaylist + 1].snippet.title)
            this.playlistElement.scrollTop = topPos - 100;
          }
        } else {
          if (inPlaylist === 0) {
            this.youtubePlayer.playVideo(this.videoPlaylist[this.videoPlaylist.length - 1].id,
              this.videoPlaylist[this.videoPlaylist.length - 1].snippet.title);
            this.playlistElement.scrollTop = this.playlistElement.offsetHeight;
          } else {
            this.youtubePlayer.playVideo(this.videoPlaylist[inPlaylist - 1].id, this.videoPlaylist[inPlaylist - 1].snippet.title)
            this.playlistElement.scrollTop = topPos - 230;
          }
        }
      }
    } else {
      this.playFirstInPlaylist();
    }
  }

  clearPlaylist(): void {
    this.videoPlaylist = [];
    this.playlistService.clearPlaylist();
  }

  // deprecated for now
  exportPlaylist(): void {
    if (this.videoPlaylist.length < 1) {
      alert('Nothing to export.');
      return;
    }
    let data = JSON.stringify(this.videoPlaylist);
    let a = document.createElement('a');
    let file = new Blob([data], { type: 'text/json' });
    a.href = URL.createObjectURL(file);
    a.download = 'playlist.json';
    a.click();
    alert('Playlist exported.');
  }

  // save playlist -> for POST create-playlist
  savePlaylist() {
    if (this.videoPlaylist.length < 1) {
      alert('Cannot Save Empty Playlist.');
      return;
    }
    // let data = JSON.stringify(this.videoPlaylist);
    // save this data with name and send to backend
    return this.http.post(posturl, JSON.stringify(this.videoPlaylist))
      .map(response => response.json());
  }

  // import playlist
  importPlaylist(playlist: any): void {
    this.videoPlaylist = playlist;
    this.playlistService.importPlaylist(this.videoPlaylist);
  }
}
