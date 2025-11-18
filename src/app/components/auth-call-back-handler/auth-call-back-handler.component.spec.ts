import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCallBackHandlerComponent } from './auth-call-back-handler.component';

describe('AuthCallBackHandlerComponent', () => {
  let component: AuthCallBackHandlerComponent;
  let fixture: ComponentFixture<AuthCallBackHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthCallBackHandlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthCallBackHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
