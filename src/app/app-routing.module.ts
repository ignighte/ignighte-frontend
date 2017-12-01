import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// internal Components
import { HomePageComponent } from './home/home-page/home-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { ProfileComponent } from './account/profile/profile.component';

// Test These
import { VideoSearchComponent } from './video/video-search/video-search.component';
import { SearchResultComponent } from './video/search-result/search-result.component';
import { VideoPlayerComponent } from './video/video-player/video-player.component';
import { VideoPlaylistComponent } from './video/video-playlist/video-playlist.component';
import { VideoPageComponent } from './video/video-page/video-page.component';
import { ViewPlaylistComponent } from './page/view-playlist/view-playlist.component';
import { MyPlaylistComponent } from './page/my-playlist/my-playlist.component';

// Routing
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'profile', component: ProfileComponent },
// Test These
  { path: 'video-search', component: VideoSearchComponent },
  { path: 'search-result', component: SearchResultComponent },
  { path: 'video-player', component: VideoPlayerComponent },
  { path: 'video-playlist', component: VideoPlaylistComponent },
  { path: 'video-page', component: VideoPageComponent },
  { path: 'view-playlist', component: ViewPlaylistComponent },
  { path: 'my-playlist', component: MyPlaylistComponent },
  { path: '**', component: HomePageComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
