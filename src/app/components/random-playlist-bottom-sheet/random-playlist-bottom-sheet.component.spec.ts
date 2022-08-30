import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomPlaylistBottomSheetComponent } from './random-playlist-bottom-sheet.component';

describe('RandomPlaylistBottomSheetComponent', () => {
  let component: RandomPlaylistBottomSheetComponent;
  let fixture: ComponentFixture<RandomPlaylistBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RandomPlaylistBottomSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomPlaylistBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
