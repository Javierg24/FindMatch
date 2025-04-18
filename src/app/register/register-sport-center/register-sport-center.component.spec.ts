import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterSportCenterComponent } from './register-sport-center.component';

describe('RegisterSportCenterComponent', () => {
  let component: RegisterSportCenterComponent;
  let fixture: ComponentFixture<RegisterSportCenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSportCenterComponent]
    });
    fixture = TestBed.createComponent(RegisterSportCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
