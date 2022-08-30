import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavePlaylistComponent } from './save-playlist.component';

describe('SavePlaylistComponent', () => {
  let component: SavePlaylistComponent;
  let fixture: ComponentFixture<SavePlaylistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavePlaylistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavePlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
