import { Component, AfterViewInit } from '@angular/core';
import { YoutubeApiService } from '../../service/youtube-api.service';
import { YoutubePlayerService } from '../../service/youtube-player.service';
import { PlaylistStoreService } from '../../service/playlist-store.service';
import { NotificationService } from '../../service/notification.service';
import { Http, Headers, Response  } from '@angular/http';

@Component({
  selector: 'app-see-playlist',
  templateUrl: './see-playlist.component.html',
  styleUrls: ['./see-playlist.component.css']
})
export class SeePlaylistComponent implements AfterViewInit {

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
      private notificationService: NotificationService,
      private http: Http
    ) {
      this.videoPlaylist = this.playlistService.retrieveStorage().playlists;
    }
  
    // AfterViewInit
    ngAfterViewInit() {
      this.playlistElement = document.getElementById('playlist');
      this.youtubePlayer.resizePlayer(500, 500);
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
  
  
    // Extend Playlist View
    togglePlaylist(): void {
      this.playlistToggle = !this.playlistToggle;
      setTimeout(() => {
        this.playlistNames = !this.playlistNames;
      }, 200);
    }
  
    // Load Search Results from YOUTUBE API with load limit and timeout
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
    playPrevNext(value): void {
      let current = this.youtubePlayer.getCurrentVideo();
      let inPlaylist;
  
      // Video Within Playlist
      this.videoPlaylist.forEach((video, index) => {
        if (video.id === current) {
          inPlaylist = index;
        }
      });
  
      // FUCK TS AND SAVE ME FROM THIS IF-ELSE SPAGHETTI HELL
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
  
    // Playlist Bar Functionalities
    closePlaylist(): void {
      this.playlistToggle = false;
      this.playlistNames = false;
    }
  
    clearPlaylist(): void {
      this.videoPlaylist = [];
      this.playlistService.clearPlaylist();
      this.notificationService.showNotification('Playlist cleared.');
    }
  
    // deprecated for now
    exportPlaylist(): void {
      if (this.videoPlaylist.length < 1) {
        this.notificationService.showNotification('Nothing to export.');
        return;
      }
      let data = JSON.stringify(this.videoPlaylist);
      let a = document.createElement('a');
      let file = new Blob([data], { type: 'text/json' });
      a.href = URL.createObjectURL(file);
      a.download = 'playlist.json';
      a.click();
      this.notificationService.showNotification('Playlist exported.');
    }
  
    // save playlist -> for POST create-playlist
    savePlaylist() {
      if (this.videoPlaylist.length < 1) {
        this.notificationService.showNotification('Playlist Empty.');
        return;
      }
      // let data = JSON.stringify(this.videoPlaylist);
      // save this data with name and send to backend
      return this.http.post(posturl, JSON.stringify(this.videoPlaylist))
        .map(response => response.json());
  
  
      // let a = document.createElement('a');
      // let file = new Blob([data], { type: 'text/json' });
      // a.href = URL.createObjectURL(file);
      // a.download = 'playlist.json';
      // a.click();
      // this.notificationService.showNotification('Playlist saved.');
    }
  
    importPlaylist(playlist: any): void {
      this.videoPlaylist = playlist;
      console.log('store-playlist');
      this.playlistService.importPlaylist(this.videoPlaylist);
    }
  }
  