import { TestBed } from '@angular/core/testing';

import { SeeTeamService } from './see-team.service';

describe('SeeTeamService', () => {
  let service: SeeTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeeTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
