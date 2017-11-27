import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// internal Components
import { HomePageComponent } from './home/home-page/home-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { SearchSongComponent } from './page/search-song/search-song.component';
import { AddVideoComponent } from './page/add-video/add-video.component';
import { AddPlaylistComponent } from './page/add-playlist/add-playlist.component';
import { ViewPlaylistComponent } from './page/view-playlist/view-playlist.component';
import { ViewVideoComponent } from './page/view-video/view-video.component';



// Routing
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent },
  { path: 'landing', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  { path: 'search-song', component: SearchSongComponent },
  { path: 'add-video', component: AddVideoComponent },
  { path: 'add-playlist', component: AddPlaylistComponent },
  { path: 'view-playlist', component: ViewPlaylistComponent },
  { path: 'view-video', component: ViewVideoComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
