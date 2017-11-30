import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { EmailValidator } from '@angular/forms';

// const url = `https://localhost:4200/register`;
const url = `http://54.68.90.169/register`;

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
      }, (error) => {console.log(error)});
  }
}

// import { Component, OnInit} from '@angular/core';
// import { Router } from '@angular/router';
// import { HttpClient } from '@angular/common/http';
// // import { AccountService } from '../../service/account.service';
// import { RegisterService } from '../../service/register.service';


// private info: any;
// private loading = false;

// // clear all inputs at constructor
// constructor(private router: Router, private reg: RegisterService) {
//   this.info = {
//     username: '',
//     password: '',
//     email: ''
//   };
//   this.loading = false;
// }

// register() {
//   this.reg.register(this.info)
//     .subscribe(result => {
//       if (result === true) {
//         this.router.navigate(['/login']);
//       } else {
//         console.log('error');
//       }
//     });
//  }

// ngOnInit() {
// }


// --------------------------

// import { Component, OnInit } from '@angular/core';
// import { HttpErrorResponse } from '@angular/common/http';
// import { Router } from '@angular/router';

// import { User } from '../../model/index';
// import { AuthenticationService } from '../../service/authentication.service';

// register() {
//   // password check mechanism
//   if (this.newAccount.password === this.passwordcheck) {
//     this.auth.register(this.newAccount)
//       .subscribe( res => {
//         if (res.status === 200) {
//           // set the authentication token
//           localStorage.setItem( this.auth.getJWT(JSON.stringify({user: this.newAccount.username}));
//           this.newAccount = new User();
//           this.router.navigate(['/landing']);
//         } else {
//           console.log('Failed to Register');
//         }
//       });

//   } else {
//     console.log('passwords must match');
//   }

// }