import { TestBed } from '@angular/core/testing';

import { VidTutorialService } from './vid-tutorial.service';
import {VideoTutorial} from '../../Shared/Models/VideoTutorialsModel';
import {HttpClientModule} from '@angular/common/http';

describe('VideoTutorialService', () => {
  let service: VidTutorialService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(VidTutorialService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Video tutorials should be retrieved from server and cached.', (done) => {
    service.getVideoTutorials().subscribe
    (
      (res: VideoTutorial[]) =>
      {
        expect(res).toBeTruthy();
        done();
      },
      err => console.error(err)
    );
  });

  it('Refreshing video tutorials retrieves data again from api and subscribers receive updated data.', (done) => {
    let count = 0;
    service.getVideoTutorials().subscribe
    (
      (res: VideoTutorial[]) =>
      {
        // count = 1 when the data is first retrieved. count = 2 when data is retrieved again with refresh call.
        count++;
        if (count === 1)
        {
          service.refreshVideoTutorials();
        }
        else if (count === 2)
        {
          expect(res).toBeTruthy();
          done();
        }
      },
      err => console.error(err)
    );
  });
});
