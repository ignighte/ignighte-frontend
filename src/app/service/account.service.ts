import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../model/index';

@Injectable()
export class AccountService {

  constructor(private http: Http) {

    // getAllUser() {
    //   return this.http.get('')
    // }

  }

  // // POST to '/register'
  // register(user: User) {
  //   return this.http.post('/register', user, this.jwt())
  //     .map((response: Response) => response.json());
  // }


  // private jwt() {
  //   // create authorization header with jwt token
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  //   if (currentUser && currentUser.token) {
  //       let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
  //       return new RequestOptions({ headers: headers });
  //   }
// }

}