import { Injectable } from '@angular/core';
import { Http,  Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class PlaylistService {

  private playlist: any[];

  private webUrl = 'http://54.68.90.169';

  constructor(private http: Http) { }

  // [GET] playlist by id, /playlist/{id}
  getPlaylistById(id: number): Observable<any> {
    const url = 'http://54.68.90.169/playlist/${id}';
    // return empty json to prevent error
    return this.http.get(url, JSON.stringify({}))
      .map((response: Response) => {
        this.playlist = response.json().playlist;
        return this.playlist;
      });
  }
}
