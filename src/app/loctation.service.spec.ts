import { TestBed } from '@angular/core/testing';

import { LoctationService } from './loctation.service';

describe('LoctationService', () => {
  let service: LoctationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoctationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
