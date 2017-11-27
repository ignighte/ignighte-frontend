import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { YoutubePlayerService } from '../../service/youtube-player.service';
import { PlaylistStoreService } from '../../service/playlist-store.service';
import { YoutubeApiService } from '../../service/youtube-api.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  @Input() videoList;
  @Input() loadingInProgress;
  @Output() videoPlaylist = new EventEmitter();

  constructor(
    private youtubePlayer: YoutubePlayerService,
    private playlistService: PlaylistStoreService
  ) { }

  ngOnInit() {
  }

  // In app play video
  play(video: any): void {
    this.youtubePlayer.playVideo(video.id, video.snippet.title);
    this.addToPlaylist(video);
  }

  // Push to playlist
  addToPlaylist(video: any): void {
    this.videoPlaylist.emit(video);
  }
}
