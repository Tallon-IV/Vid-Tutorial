import { Injectable } from '@angular/core';
import {VidTutorialApiService} from '../Http/vid-tutorial-api.service';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {VideoTutorial} from '../../Shared/Models/VideoTutorialsModel';

@Injectable({
  providedIn: 'root'
})
export class VidTutorialService {

  videoTutorials: ReplaySubject<VideoTutorial[]>;
  constructor(private api: VidTutorialApiService)
  {
    this.videoTutorials = new ReplaySubject<VideoTutorial[]>(1);
    this.refreshVideoTutorials();
  }

  getVideoTutorials(): Observable<VideoTutorial[]>
  {
    return this.videoTutorials.asObservable();
  }

  refreshVideoTutorials(): void
  {
    this.api.fetchVidTutorials().subscribe
    (
      (res: VideoTutorial[]) =>
      {
        this.videoTutorials.next(res);
      },
      err =>
      {
        console.error(err);
      }
    );
  }
}
