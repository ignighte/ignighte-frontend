import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// internal Components
import { HomePageComponent } from './home/home-page/home-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

// Remove if test works
import { SearchSongComponent } from './page/search-song/search-song.component';
import { AddVideoComponent } from './page/add-video/add-video.component';
import { AddPlaylistComponent } from './page/add-playlist/add-playlist.component';
import { ViewVideoComponent } from './page/view-video/view-video.component';

// Test These
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { SearchResultComponent } from './video/search-result/search-result.component';
import { VideoPlayerComponent } from './video/video-player/video-player.component';
import { VideoPlaylistComponent } from './video/video-playlist/video-playlist.component';
import { VideoPageComponent } from './video/video-page/video-page.component';
import { ViewPlaylistComponent } from './page/view-playlist/view-playlist.component';
import { SeePlaylistComponent } from './video/see-playlist/see-playlist.component';

// Routing
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
// Remove After VideoRoutes Work
  { path: 'search-song', component: SearchSongComponent },
  { path: 'add-video', component: AddVideoComponent },
  { path: 'add-playlist', component: AddPlaylistComponent },
  { path: 'view-playlist', component: ViewPlaylistComponent },
  { path: 'view-video', component: ViewVideoComponent },
// Test These
  { path: 'video-search', component: VideoSearchComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'video-player', component: VideoPlayerComponent },
  { path: 'video-playlist', component: VideoPlaylistComponent },
  { path: 'video-page', component: VideoPageComponent },
  { path: 'see-playlist', component: SeePlaylistComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
