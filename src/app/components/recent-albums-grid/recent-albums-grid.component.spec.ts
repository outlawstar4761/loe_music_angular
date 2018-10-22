import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentAlbumsGridComponent } from './recent-albums-grid.component';

describe('RecentAlbumsGridComponent', () => {
  let component: RecentAlbumsGridComponent;
  let fixture: ComponentFixture<RecentAlbumsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentAlbumsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentAlbumsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
