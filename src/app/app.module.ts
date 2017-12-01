import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// internal module
import { AppRoutingModule } from './app-routing.module';

// Services
import { RegisterService } from './service/register.service';
import { AuthenticationService } from './service/authentication.service';
import { AccountService } from './service/account.service';


// internal components
import { AppComponent } from './app.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { ViewPlaylistComponent } from './page/view-playlist/view-playlist.component';

import { HomePageComponent } from './home/home-page/home-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { NowPlayingPipe } from './pipe/now-playing.pipe';
import { VideoPlayerComponent } from './video/video-player/video-player.component';
import { VideoPlaylistComponent } from './video/video-playlist/video-playlist.component';
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { SearchResultComponent } from './video/search-result/search-result.component';
import { YoutubeApiService } from './service/youtube-api.service';
import { YoutubePlayerService } from './service/youtube-player.service';
import { PlaylistStoreService } from './service/playlist-store.service';

import { VideoPageComponent } from './video/video-page/video-page.component';

// import { SeePlaylistComponent } from './video/see-playlist/see-playlist.component';
import { ProfileComponent } from './account/profile/profile.component';


@NgModule({
  declarations: [
    VideoPageComponent,
    AppComponent,
    RegisterComponent,
    LoginComponent,

    ViewPlaylistComponent,

    HomePageComponent,
    LandingPageComponent,

    NowPlayingPipe,
    VideoPlayerComponent,
    VideoPlaylistComponent,
    VideoSearchComponent,
    SearchResultComponent,
    // SeePlaylistComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    // RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [
    Location,
    YoutubeApiService,
    YoutubePlayerService,
    PlaylistStoreService,

    RegisterService,
    AuthenticationService,
    AccountService,
    HttpClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
