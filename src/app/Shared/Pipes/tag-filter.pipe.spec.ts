import { TagFilterPipe } from './tag-filter.pipe';
import {TestBed} from '@angular/core/testing';
import {VideoTutorial} from '../Models/VideoTutorialsModel';
import {TagCheckboxModel} from '../Models/TagCheckboxModel';
import {SharedModule} from '../shared/shared.module';

describe('TagFilterPipe', () => {
  let pipe: TagFilterPipe;
  let videos: VideoTutorial[];
  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports: [SharedModule]
    });
    pipe = TestBed.inject(TagFilterPipe);
    videos =
      [
        {
          id: '75b908e4-927d-4971-9e20-e140afefbc33',
          videoUrl: 'https://thisurldoesnotactuallyexist.totallynotreal/75b908e4-927d-4971-9e20-e140afefbc33',
          videoTitle: 'Learn: Food',
          tags: [
            'Easy',
            'Engaging',
            'Interactive',
            'Energetic'
          ],
          teacherName: 'Sam',
          teacherId: 'c652331b-f28e-4c7f-9957-eeac3cd9349e',
          averageUserRating: 0.7859463652364571
        },
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

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('Pipe should return same array of VideoTutorials if there are no selected tags.', () =>
  {
    expect(pipe.transform(videos, [])).toEqual(videos);
  });

  it('Pipe should return VideoTutorials only containing selected tags.', () =>
  {
    const tags: TagCheckboxModel[] =
      [
        {
          label: 'Easy',
          checked: true
        },
        {
          label: 'Energetic',
          checked: false
        }
      ];

    // Should return three video tutorials since only 3/4 contain Easy tags.
    const filteredVideos: VideoTutorial[] = pipe.transform(videos, tags);
    expect(filteredVideos.length).toEqual(3);
    // make extra sure
    expect(filteredVideos[0].tags.includes('Easy')).toBeTrue();
    expect(filteredVideos[1].tags.includes('Easy')).toBeTrue();
    expect(filteredVideos[2].tags.includes('Easy')).toBeTrue();
  });

  it('Pipe should return video tutorials with selected tags in descending order of average rating.', () =>
  {
    const tags: TagCheckboxModel[] =
      [
        {
          label: 'Easy',
          checked: true
        }
      ];

    // Out of the videos with easy tags, Story:Animals followed by Learn:Food and then Learn:Places
    expect(pipe.transform(videos, tags)[0].averageUserRating).toEqual(0.9009146212755315);
    expect(pipe.transform(videos, tags)[1].averageUserRating).toEqual(0.7859463652364571);
    expect(pipe.transform(videos, tags)[2].averageUserRating).toEqual(0.5458206617440222);
  });
});
