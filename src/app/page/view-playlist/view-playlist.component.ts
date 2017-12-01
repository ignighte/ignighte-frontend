import { Component, OnInit, Input } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Params, Router, ActivatedRoute } from '@angular/router';

import { PlaylistService } from '../../service/playlist.service';

import { Playlist } from '../../model/playlist';

@Component({
  selector: 'app-view-playlist',
  templateUrl: './view-playlist.component.html',
  styleUrls: ['./view-playlist.component.css']
})
export class ViewPlaylistComponent implements OnInit {


  @Input() playlistId: number;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) { }

  // *To Chris: Just move getAll the function OnInit
  ngOnInit() {
  }

}
