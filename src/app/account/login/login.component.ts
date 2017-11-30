import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Login, User } from '../../model/index';
import { AuthenticationService } from '../../service/authentication.service';

const url = `http://54.68.90.169:8080/login`;

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
    private route: ActivatedRoute,
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
      .subscribe(data => {
        this.router.navigate([url]);
      },
      error => {
        console.log(error);
        this.loading = false;
      });
  }

  // login() {
  //   this.http.post(url, {
  //     'username': this.username,
  //     'password': this.password
  //   }).subscribe((response) => {
  //     let user = response[0];
  //     }, (error) => { alert('failed to login')
  //     });
  // }


}

  // onLogin(loginCredentials: Login) {
  //   // this.authService.login (
  //   //   loginCredentials.username,
  //   //   loginCredentials.password
  //   // );
  // }

  // ngOnInit() {
  // }
