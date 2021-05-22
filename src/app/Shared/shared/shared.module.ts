import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VidTutFilterPipe} from '../Pipes/vid-tut-filter.pipe';
import {TagFilterPipe} from '../Pipes/tag-filter.pipe';



@NgModule({
    declarations: [VidTutFilterPipe, TagFilterPipe],
    imports: [
        CommonModule
    ],
  exports: [
    VidTutFilterPipe,
    TagFilterPipe
  ],
    providers: [VidTutFilterPipe, TagFilterPipe]
})
export class SharedModule { }
