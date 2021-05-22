import { Pipe, PipeTransform } from '@angular/core';
import {VideoTutorial} from '../Models/VideoTutorialsModel';

@Pipe({
  name: 'vidTutFilter'
})
export class VidTutFilterPipe implements PipeTransform
{
  /**
   * Inputs: a collection of video tutorials and words typed by the user
   * Outputs: a collection of tutorials, which match the user search term.
   */
  transform(vidTuts: VideoTutorial[]|null, searchTerm: string): VideoTutorial[]
  {
    if (!vidTuts || vidTuts.length === 0)
    {
      return [];
    }

    if (!searchTerm)
    {
      return vidTuts;
    }

    searchTerm = searchTerm.toLowerCase();

    return vidTuts.filter
    (
      (vidTut: VideoTutorial) =>
      {
        return vidTut.videoTitle.toLowerCase().includes(searchTerm) || vidTut.teacherName.toLowerCase().includes(searchTerm);
      }
    );
  }

}
