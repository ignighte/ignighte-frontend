import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { EmailValidator } from '@angular/forms';

// const url = `https://localhost:4200/register`;
const url = 'http://54.68.90.169/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  // Set all inputs to empty string literal
  username = '';
  email  = '';
  password = '';
  passwordcheck = '';

  constructor(private router: Router, private http: HttpClient) { }

  // [POST] /register
  register() {

    // save the response body
    let resBody = {
      username: this.username,
      email: this.email,
      password: this.password };

      // write to db
      this.http.post(url, resBody).subscribe((response) => {
        this.router.navigate(['/login']);
        alert('account created!');
      }, (error) => {
        alert('username already exists!');
        console.log(error);
      });
  }
}