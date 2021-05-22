import { TestBed } from '@angular/core/testing';

import { VidTutorialApiService } from './vid-tutorial-api.service';
import {VideoTutorial} from '../../Shared/Models/VideoTutorialsModel';
import {HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';

describe('VidTutorialService', () => {
  let service: VidTutorialApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VidTutorialApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Initial data should be fetched.', (done) => {
    const vidTutorialObs: Observable<VideoTutorial[]> = service.fetchVidTutorials();
    vidTutorialObs.subscribe((res: VideoTutorial[]) => expect(res).toBeTruthy(),
      err => console.log(err),
      () =>
      {
        console.log('complete');
        done();
      });
  });

  it('Retrieved data matches interface', (done) => {
    service.fetchVidTutorials().subscribe(
      (res: VideoTutorial[]) =>
      {
        expect(res[0].id).toBeInstanceOf(String);
        expect(res[0].tags).toBeInstanceOf(Array);
        expect(res[0].teacherId).toBeInstanceOf(String);
        expect(res[0].teacherName).toBeInstanceOf(String);
        expect(res[0].videoTitle).toBeInstanceOf(String);
        expect(res[0].videoUrl).toBeInstanceOf(String);
        expect(res[0].averageUserRating).toBeInstanceOf(Number);
        done();
      }
    );
  });

});
