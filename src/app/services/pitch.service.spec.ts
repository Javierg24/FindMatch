import { TestBed } from '@angular/core/testing';

import { PitchService } from './pitch.service';

describe('PitchService', () => {
  let service: PitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
