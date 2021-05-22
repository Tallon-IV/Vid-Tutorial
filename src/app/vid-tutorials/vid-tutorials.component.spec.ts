import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import { VidTutorialsComponent } from './vid-tutorials.component';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from '../Shared/shared/shared.module';
import {FormsModule} from '@angular/forms';

describe('VidTutorialsComponent', () => {
  let component: VidTutorialsComponent;
  let fixture: ComponentFixture<VidTutorialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VidTutorialsComponent ],
      imports: [HttpClientModule, SharedModule, FormsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VidTutorialsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Search box should be the first input element on the page.', (done) =>
  {
    // Set a timeout so the component finishes loading before the test starts.
    setTimeout(() =>
    {
      fixture.detectChanges();
      const mainElement: Element = fixture.nativeElement;
      const inputs: HTMLCollection = mainElement.getElementsByTagName('input');
      expect(inputs[0].id).toEqual('searchInput');
      done();
    }, 4000);
  });

  it('Full Term Search: If Katy is in the search box, no videos by other authors should be present on the page.',
    (done) => {
    setTimeout(() =>
    {
      fixture.detectChanges();
      const mainElement: Element = fixture.nativeElement;
      component.searchTerm = 'Katy';
      fixture.detectChanges();
      const display: string|null = mainElement.textContent;
      if (display)
      {
        expect(display.includes('Lee')).toBeFalse();
      }
      else
      {
        fail('Text content null.');
      }
      done();
    }, 4000);
  });

  afterEach(() =>
  {
    component.ngOnDestroy();
  });

});
