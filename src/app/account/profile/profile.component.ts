import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { AccountService } from '../../service/account.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

  account: any = {};

  constructor(
    private router: Router,
    private http: Http,
    private acc: AccountService
  ) { }

  ngOnInit() {
  }

  changePassword() {
    this.acc.changePassword(this.account.username, this.account.password, this.account.newPassword)
      .subscribe(result => {
        if (result !== false) {
          alert('password change successful');
          console.log('result: ', result);
          this.router.navigate(['/landing']);
        }}, (error => {
          alert('your credentials are incorrect');
          console.log('result: ');
        })
      );
  }

}
