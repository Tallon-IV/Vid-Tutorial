import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {VideoTutorial} from '../../Shared/Models/VideoTutorialsModel';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VidTutorialApiService
{
  constructor(private http: HttpClient) {}

  /**
   * Fetches video tutorials data from the test server.
   * @returns An observable of [[VideoTutorial]] array.
   */
  fetchVidTutorials(): Observable<VideoTutorial[]>
  {
    return this.http.get<VideoTutorial[]>('https://lingumi-take-home-test-server.herokuapp.com/videoTutorials');
  }
}
