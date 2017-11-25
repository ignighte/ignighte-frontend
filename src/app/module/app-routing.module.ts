import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// internal Components
import { HomePageComponent } from '../home/home-page/home-page.component';
import { LandingPageComponent } from '../home/landing-page/landing-page.component';
import { LoginComponent } from '../account/login/login.component';
import { RegisterComponent } from '../account/register/register.component';

// Routing
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomePageComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
