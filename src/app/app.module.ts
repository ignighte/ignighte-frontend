import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

// internal module
import { AppRoutingModule } from './module/app-routing.module';

// internal components
import { AppComponent } from './app.component';
import { RegisterComponent } from './account/register/register.component';
import { LoginComponent } from './account/login/login.component';
import { LogoutComponent } from './account/logout/logout.component';
import { ViewPlaylistComponent } from './module/view-playlist/view-playlist.component';
import { AddPlaylistComponent } from './module/add-playlist/add-playlist.component';
import { AddVideoComponent } from './module/add-video/add-video.component';
import { ViewVideoComponent } from './module/view-video/view-video.component';
import { HomePageComponent } from './home/home-page/home-page.component';
import { LandingPageComponent } from './home/landing-page/landing-page.component';


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
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    // RouterModule.forRoot(routes),
    AppRoutingModule
  ],
  providers: [Location],
  bootstrap: [AppComponent]
})
export class AppModule { }
