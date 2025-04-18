import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRefereeComponent } from './register-referee.component';

describe('RegisterRefereeComponent', () => {
  let component: RegisterRefereeComponent;
  let fixture: ComponentFixture<RegisterRefereeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterRefereeComponent]
    });
    fixture = TestBed.createComponent(RegisterRefereeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
