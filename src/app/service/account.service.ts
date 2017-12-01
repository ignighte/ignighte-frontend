import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from '../model/index';

@Injectable()
export class AccountService {

  private webUrl = 'http://54.68.90.169';

  constructor(private http: Http) { }

  // [POST]'/changePassword'
  changePassword(username: string, password: string, newPassword: string) {
    console.log('before return', 'json: ', JSON.stringify({username: username,
      password: password,
      newPassword: newPassword}));
    return this.http.put('http://54.68.90.169/changePassword', JSON.stringify({
      username: username,
      password: password,
      newPassword: newPassword
    }))
      .map(response => response.json());
  }

}