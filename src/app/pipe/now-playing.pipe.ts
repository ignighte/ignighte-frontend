// Custom pipe for now-playing song's name display
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nowPlaying'
})

export class NowPlayingPipe implements PipeTransform {
  transform(value: any, args?: any[]): any {

    if (value.length > 55) {
      value = value.substring(0, 51) + '...';
    }

    return value;
  }
}
