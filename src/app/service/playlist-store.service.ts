// will store playlists for set account In JSON
// Until Backend Fix their DB
import { Injectable } from '@angular/core';

@Injectable()
export class PlaylistStoreService {

  // player
  private vidPlayer = 'vid_player';
  private playlists_template: Object = {
    'playlists': []
  };

  constructor() { }

  // Use Local Storage for temp and export as JSON
  // Will Auto store, and also be able to export the list
  // Hopefully backend will fix DB
  private init(): void {
    localStorage.setItem(this.vidPlayer, JSON.stringify(this.playlists_template));
  }

  // Get the locally stored playlist , parse it and add to playlist
  public retrieveStorage() {
    let storedPlaylist = this.parse();
    if (!storedPlaylist) {
      this.init();
      storedPlaylist = this.parse();
    }

    return storedPlaylist;
  }

  // Import the JSON file
  public importPlaylist(videos: any): void {
    let store = this.parse();
    console.log('store-playlist');
    store.playlists = videos;
    localStorage.setItem(this.vidPlayer, JSON.stringify(store));
  }

  // Add to the curr Playlist
  public addToPlaylist(video: Object): void {
    let store = this.parse();
    store.playlists.push(video);
    localStorage.setItem(this.vidPlayer, JSON.stringify(store));
  }

    // Delete all from playlsit
    public clearPlaylist() {
      this.init();
    }

  // With X button, remove the video
  public removeFromPlaylist(video: any): void {
    let store = this.parse();
    store.playlists = store.playlists.filter(item => item.id !== video.id);
    localStorage.setItem(this.vidPlayer, JSON.stringify(store));
  }

  // parse
  private parse() {
    return JSON.parse(localStorage.getItem(this.vidPlayer));
  }

}
