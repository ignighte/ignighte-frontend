import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

  // Temp for localhost
  const url = 'http://54.68.90.169/login';

@Injectable()
export class AuthenticationService {

  private isLoggedIn;

  constructor(private http: Http) { this.isLoggedIn = false; }

  login(username: string, password: string) {
    return this.http.post(url, JSON.stringify({username: username, password: password}))
      .map((response: Response) => {
        // if successful, jwt response
        let user = response.json();
        if (user) {
          // store jwt + user info in local
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      });
  }

  setLoggedIn() {
    this.isLoggedIn = true;
  }

  getLoggedIn() {
    return this.isLoggedIn;
  }


  logout() {
    // remove user token
    localStorage.removeItem('currentUser');
  }

}

// import { Injectable } from '@angular/core';
// import { Http, Headers, Response } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';


// public user: string;

//   constructor(private http: Http) {
//     let currUser = JSON.parse(localStorage.getItem('currUser'));
//     this.user = currUser && currUser.uid;
//    }

//   // [POST] /login
//   login (username: string, password: string): Observable<boolean> {
//     return this.http.post(`/login`, JSON.stringify({
//       username: username,
//       password: password
//     }))
//       .map((response: Response) => {
//         // check if user is in the database : if userid returns
//         let user = response.json() && response.json().uid;
//         // check if reponse came with
//         if (user && user.uid) {
//           // this.user = user;
//           localStorage.setItem('currentUser', JSON.stringify({user: user}));
//           // may want to input boolean or string value for further use
//           return true;
//         } else {
//           console.log('The Information is incorrect');
//           return false;
//         }
//       });
//   }

//   // to see if someone is logged in, get current user


//   // [POST] logout
//   logout() {
//     this.user = null;
//     localStorage.removeItem('currUser');
//   }


// constructor(private router: Router, private http: HttpClient) {}

//   // POST /register
//   register(user: User): Observable<HttpResponse<any>> {
//     const url = `${this.serverUrl}/register`;
//     return this.http.post<Response>(url, { username: user.username,
//       email: user.email, password: user.password},
//       {observe: 'response'}).pipe(tap(res =>
//         console.log(`Registered User : ${user.username}`)));
//   }

//   // Whatever Chi did
//   getJWT(input) {
//     let tempString: string;
//     return tempString;
//   }
