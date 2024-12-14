import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlaylistBottomSheetComponent } from './my-playlist-bottom-sheet.component';

describe('MyPlaylistBottomSheetComponent', () => {
  let component: MyPlaylistBottomSheetComponent;
  let fixture: ComponentFixture<MyPlaylistBottomSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlaylistBottomSheetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyPlaylistBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
