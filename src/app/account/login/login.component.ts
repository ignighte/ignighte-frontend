import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Login, User } from '../../model/index';
import { AuthenticationService } from '../../service/authentication.service';

const url = `http://54.68.90.169/login`;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  account: any = {};
  loading = false;

  // constructor will read the data from GET /login
  constructor(
    private router: Router,
    private http: HttpClient,
    // private route: ActivatedRoute,
    private auth: AuthenticationService
  ) {

  }

  ngOnInit() {
    // reset login
    this.auth.logout();
  }

  login() {
    this.loading = true;
    this.auth.login(this.account.username, this.account.password)
      .subscribe(result => {
        if (result !== false) {
          alert('IGNIGHTION COMPLETE');
          localStorage.setItem('token', result.TOKEN);
          this.router.navigate(['/landing']);
        }}, (error => {
        alert('IGNIGHTION UNSUCCESSFUL, REVIEW INPUT');
        this.loading = false;
      }));
  }




}
