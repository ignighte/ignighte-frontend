import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { YoutubeApiService } from '../../service/youtube-api.service';
import { YoutubePlayerService } from '../../service/youtube-player.service';
import { NotificationService } from '../../service/notification.service';


@Component({
  selector: 'app-video-search',
  templateUrl: './video-search.component.html',
  styleUrls: ['./video-search.component.css']
})
export class VideoSearchComponent implements OnInit {

  @Output() videosUpdated = new EventEmitter();
  @Input() loadingInProgress;

  private last_search: string;

  public searchForm = this.fb.group({
    query: ['', Validators.required]
  });

  // services
  constructor(
    public fb: FormBuilder,
    private youtubeService: YoutubeApiService,
    private youtubePlayer: YoutubePlayerService,
    private notificationService: NotificationService
  ) {
      this.youtubeService.searchVideos('')
      .then(data => {
        this.videosUpdated.emit(data);
      })
    }

  ngOnInit() {
  }

  // Search Function
  doSearch(event): void {
    if (this.loadingInProgress || (this.searchForm.value.query.trim().length === 0) ||
      (this.last_search && this.last_search === this.searchForm.value.query)) {
      return;
    }

    this.videosUpdated.emit([]);
    this.last_search = this.searchForm.value.query;

    this.youtubeService.searchVideos(this.last_search)
      .then(data => {
        if (data.length < 1) {
          this.notificationService.showNotification('No matches found.');
        }
        this.videosUpdated.emit(data);
      })
  }

}
