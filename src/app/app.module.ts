import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// internal module
import { AppRoutingModule } from './app-routing.module';

// internal components
import { AppComponent } from './app.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { LogoutComponent } from './account/logout/logout.component';
import { ViewPlaylistComponent } from './page/view-playlist/view-playlist.component';
import { AddPlaylistComponent } from './page/add-playlist/add-playlist.component';
import { AddVideoComponent } from './page/add-video/add-video.component';
import { ViewVideoComponent } from './page/view-video/view-video.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { SearchSongComponent } from './page/search-song/search-song.component';
import { NowPlayingPipe } from './pipe/now-playing.pipe';
import { VideoPlayerComponent } from './video/video-player/video-player.component';
import { VideoPlaylistComponent } from './video/video-playlist/video-playlist.component';
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { SearchResultComponent } from './video/search-result/search-result.component';
import { YoutubeApiService } from './service/youtube-api.service';
import { YoutubePlayerService } from './service/youtube-player.service';
import { PlaylistStoreService } from './service/playlist-store.service';
import { NotificationService } from './service/notification.service';
import { BrowserNotificationService } from './service/browser-notification.service';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    LogoutComponent,
    ViewPlaylistComponent,
    AddPlaylistComponent,
    AddVideoComponent,
    ViewVideoComponent,
    HomePageComponent,
    LandingPageComponent,
    SearchSongComponent,
    NowPlayingPipe,
    VideoPlayerComponent,
    VideoPlaylistComponent,
    VideoSearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [
    Location,
    YoutubeApiService,
    YoutubePlayerService,
    PlaylistStoreService,
    NotificationService,
    BrowserNotificationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
