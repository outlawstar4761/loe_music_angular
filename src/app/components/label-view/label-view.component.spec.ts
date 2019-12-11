import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelViewComponent } from './label-view.component';

describe('LabelViewComponent', () => {
  let component: LabelViewComponent;
  let fixture: ComponentFixture<LabelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
