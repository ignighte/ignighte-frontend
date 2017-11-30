// Connect with Youtube API on google console for Song Search and video display
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';


import { NotificationService } from './notification.service';
import { YOUTUBE_API_KEY } from '../model/api-key';

@Injectable()
export class YoutubeApiService {

  // For Display and connecting to YOutube API
  base_url = 'https://www.googleapis.com/youtube/v3/';
  // Just Top 10 for now. Change it once we have
  // 1. overflow Scroll [o] implemented
  // 2. Or add in the max_result by themselves on screen.
  max_results = 1;

  public nextToken: string;
  public lastQuery: string;

  constructor(
    private http: Http,
    private notificationService: NotificationService
  ) { }

  // Song Search
  searchVideos(query: string): Promise<any> {
    const url = this.base_url + 'search?q=' + query + '&maxResults=' + this.max_results +
      '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';

    return this.http.get(url)
      .map(response => {
        let jsonRes = response.json();
        let res = jsonRes['items'];
        this.lastQuery = query;
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;

        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError)
  }

  // Next page
  searchNext(): Promise<any> {
    const url = this.base_url + 'search?q=' + this.lastQuery + '&pageToken=' + this.nextToken +
      '&maxResults=' + this.max_results + '&type=video&part=snippet,id&key=' + YOUTUBE_API_KEY + '&videoEmbeddable=true';

    return this.http.get(url)
      .map(response => {
        let jsonRes = response.json();
        let res = jsonRes['items'];
        this.nextToken = jsonRes['nextPageToken'] ? jsonRes['nextPageToken'] : undefined;
        let ids = [];

        res.forEach((item) => {
          ids.push(item.id.videoId);
        });

        return this.getVideos(ids);
      })
      .toPromise()
      .catch(this.handleError)
  }

  // HTTP request using YOUTUBE API
  getVideos(ids): Promise<any> {
    const url = this.base_url + 'videos?id=' + ids.join(',') + '&maxResults=' + this.max_results +
      '&type=video&part=snippet,contentDetails,statistics&key=' + YOUTUBE_API_KEY;

    return this.http.get(url)
      .map(results => {
        console.log(results.json()['items']);
        return results.json()['items'];
      })
      .toPromise()
      .catch(this.handleError)
  }

  // Error Handling for reqeusts
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.notificationService.showNotification(errMsg);
    return Promise.reject(errMsg);
  }

}
