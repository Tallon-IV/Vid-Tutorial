import { VidTutFilterPipe } from './vid-tut-filter.pipe';
import {TestBed} from '@angular/core/testing';
import {SharedModule} from '../shared/shared.module';
import {VideoTutorial} from '../Models/VideoTutorialsModel';

describe('VidTutFilterPipe', () =>
{
  let pipe: VidTutFilterPipe;
  let videos: VideoTutorial[];
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [SharedModule]
    });
    pipe = TestBed.inject(VidTutFilterPipe);
    videos =
      [
        {
          id: '4f99907f-047e-40c0-bb7c-a002c256fb36',
          videoUrl: 'https://thisurldoesnotactuallyexist.totallynotreal/4f99907f-047e-40c0-bb7c-a002c256fb36',
          videoTitle: 'Story: Animals',
          tags: [
            'Calming',
            'Energetic',
            'Easy'
          ],
          teacherName: 'Monica',
          teacherId: '8a44b04b-aa57-4d92-b91b-0b091b31366e',
          averageUserRating: 0.9009146212755315
        },
        {
          id: 'd137868f-5ed8-4960-b5c7-182ff89fc446',
          videoUrl: 'https://thisurldoesnotactuallyexist.totallynotreal/d137868f-5ed8-4960-b5c7-182ff89fc446',
          videoTitle: 'Learn: Places',
          tags: [
            'Easy'
          ],
          teacherName: 'Jane',
          teacherId: '10bfe35a-c777-437a-867b-0963860a2cfa',
          averageUserRating: 0.5458206617440222
        },
        {
          id: 'ee290419-054d-4db1-8042-4ccf04d211ca',
          videoUrl: 'https://thisurldoesnotactuallyexist.totallynotreal/ee290419-054d-4db1-8042-4ccf04d211ca',
          videoTitle: 'Practice: Work',
          tags: [
            'Exploring',
            'Hard',
            'Energetic'
          ],
          teacherName: 'Lee',
          teacherId: 'e2fe406e-07b2-4606-839a-8d3bcf32c880',
          averageUserRating: 0.8558835489243932
        }
      ];
  });

  it('create an instance', () =>
  {
    expect(pipe).toBeTruthy();
  });

  it('Given no search term to filter against, should return original array of video tutorials.', () =>
  {
    expect(pipe.transform(videos, '')).toEqual(videos);
  });

  it('Given a search term, the returned video tutorials should be one containing the search term in their title or author',
    () =>
    {
      // The letter e is only found in two video title and authors. Should expect only those two videos.
      expect(pipe.transform(videos, 'e').length).toEqual(2);
    });

  it('Given a search term with letters in random case, the pipe should ignore the cases when filtering.',
    () =>
    {
      // The search term MoNiCa should still give us a video by Monica.
      expect(pipe.transform(videos, 'MoNiCa').length).toEqual(1);
    });
});
