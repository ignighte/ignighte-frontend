import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

    private token: string;

    constructor(private http: Http) { }

    // [POST] /register
    register(userCredentials: any): Observable<boolean> {
        return this.http.post('/register', JSON.stringify(userCredentials))
            .map((response: Response) => {
            console.log('response itself: ', response);
            console.log('credentials: ', JSON.stringify(userCredentials));
            const responseStatus = response.status;
            // as long as it's not unauthorized access
            if (responseStatus !== (401)) {
                // response is null
                this.token = response.json();
                console.log('Here is Null: ', response.text());
                localStorage.setItem('currUser', JSON.stringify({authtoken: this.token}));
                console.log(localStorage.getItem('currUser'));
                return true;
            } else {
                return false;
            }
        });
    }
}


    // // to check for passed user id in case of guest vs user
    // private reqUser: string;
    // private jwt_token: string;

