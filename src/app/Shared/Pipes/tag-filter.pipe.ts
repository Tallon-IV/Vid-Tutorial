import { Pipe, PipeTransform } from '@angular/core';
import {VideoTutorial} from '../Models/VideoTutorialsModel';
import {TagCheckboxModel} from '../Models/TagCheckboxModel';

@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform
{
  /**
   * @param vidTuts Array of video tutorials.
   * @param tags    Array of TagCheckboxModels
   * @returns A filtered array of video tutorials containing tags that have ticked checkboxes.
   */
  transform(vidTuts: VideoTutorial[]|null, tags: TagCheckboxModel[]): VideoTutorial[]
  {
    if (!vidTuts)
    {
      return [];
    }

    if (!tags || tags.length === 0)
    {
      return vidTuts;
    }

    const selectedTags = tags.filter
    (
      x =>
      {
        return x.checked;
      });

    return vidTuts.filter((vidTut: VideoTutorial) =>
    {
      /**
       * If it includes even one selected tag, it can be in the result list.
       */
      return vidTut.tags.map
      (
        (tag: string) =>
        {
          const contains: TagCheckboxModel|undefined = selectedTags.find
          ((selectedTag: TagCheckboxModel) =>
          {
            return selectedTag.label === tag;
          });

          return contains !== undefined;
        }).includes(true);
    }).sort(
      (a: VideoTutorial, b: VideoTutorial) =>
      {
        return b.averageUserRating - a.averageUserRating;
      });
  }

}
