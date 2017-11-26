import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../../service/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [RegisterService]
})



export class RegisterComponent implements OnInit {

// initialize fields
username = '';
password = '';
passwordCheck = '';
message = '';

  constructor(private regService: RegisterService) { }

  ngOnInit() {
  }

  register() {
    if (this.username.trim() === '') {
      this.message = 'Username is a Required Field';
      return;
    }

    if (this.password.trim() === '') {
      this.message = 'Password is a Required Field';
      return;
    }

    if (this.passwordCheck.trim() !== this.password.trim()) {
      this.message = 'Your Password does not match';
      return;
    }

    let user = {
      username: this.username,
      password: this.password
    };

    this.regService.checkExistingUser(user)
      .then(result => {
        if (result.exist === 'exist') {
          this.message = 'The username or email is already registered. Please edit the information and try again.'
        } else {
          this.message = '';
          let body = {
            username: this.username,
            password: this.password
          };
          this.regService.register(body)
            .then(result => {
              this.message = result.message;
            });
        }
      });
  }

}
