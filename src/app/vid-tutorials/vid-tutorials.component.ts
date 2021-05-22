import { Component, OnInit, OnDestroy } from '@angular/core';
import {VidTutorialService} from '../Core/Services/vid-tutorial.service';
import {Observable, Subject} from 'rxjs';
import {VideoTutorial} from '../Shared/Models/VideoTutorialsModel';
import {TagCheckboxModel} from '../Shared/Models/TagCheckboxModel';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-vid-tutorials',
  templateUrl: './vid-tutorials.component.html',
  styleUrls: ['./vid-tutorials.component.scss']
})
export class VidTutorialsComponent implements OnDestroy, OnInit
{
  onRefresh = false;
  searchTerm = '';
  tagChoices: TagCheckboxModel[] = [];
  vidTutorials!: Observable<VideoTutorial[]>;

  unsubscribeOnDestroy: Subject<boolean> = new Subject();

  constructor(private vidTutService: VidTutorialService) { }

  ngOnInit(): void
  {
    this.vidTutorials = this.vidTutService.getVideoTutorials();
    /**
     * Fill the tags array as the data comes in.
     */
    this.vidTutorials
      .pipe(takeUntil(this.unsubscribeOnDestroy))
      .subscribe
    (
      (res: VideoTutorial[]) =>
      {
        // Alert user that refresh was successful.
        if (this.onRefresh)
        {
          alert('Video tutorials have been refreshed!');
          this.onRefresh = false;
        }

        // Update tag checkboxes
        // Clear array in case any tags are no longer used for videos.
        this.tagChoices = [];

        res.map((vidTut: VideoTutorial) =>
        {
          vidTut.tags.map((tag: string) =>
          {
            const index = this.tagChoices.findIndex(x =>
              {
                return x.label === tag;
              });

            if (index === -1)
            {
              const tagCheckbox: TagCheckboxModel =
                {
                  label: tag,
                  checked: false
                };
              this.tagChoices.push(tagCheckbox);
            }
          });
        });
      },
      err => console.error(err)
    );
  }

  /**
   * Called whenever a tag checkbox is toggled.
   * @param event An event triggered by the user clicking the checkbox.
   */
  onTagToggled(event: Event): void
  {
    const checkbox: HTMLInputElement = event.target as HTMLInputElement;
    const tag: TagCheckboxModel|undefined = this.tagChoices.find
    (
      x =>
      {
        return x.label === checkbox.name;
      });

    if (tag === undefined)
    {
      return;
    }

    tag.checked = checkbox.checked;
  }

  /**
   * Gets only the tags that have been selected by the user.(The ticked checkboxes)
   * @returns TagCheckboxModel[] Tags that have their checkboxes ticked.
   */
  getSelectedTags(): TagCheckboxModel[]
  {
    return this.tagChoices.filter
    (
      x =>
      {
        return x.checked;
      });
  }

  /**
   * Refreshes the video tutorial data by retrieving a new copy from the api.
   */
  refreshVideos(): void
  {
    this.vidTutService.refreshVideoTutorials();
    this.onRefresh = true;
  }

  ngOnDestroy(): void
  {
    this.unsubscribeOnDestroy.next(true);
    this.unsubscribeOnDestroy.complete();
  }
}
