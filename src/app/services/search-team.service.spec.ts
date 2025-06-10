import { TestBed } from '@angular/core/testing';

import { SearchTeamService } from './search-team.service';

describe('SearchTeamService', () => {
  let service: SearchTeamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchTeamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
