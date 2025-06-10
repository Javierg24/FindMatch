import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTeamComponent } from './search-team.component';

describe('SearchTeamComponent', () => {
  let component: SearchTeamComponent;
  let fixture: ComponentFixture<SearchTeamComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTeamComponent]
    });
    fixture = TestBed.createComponent(SearchTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
