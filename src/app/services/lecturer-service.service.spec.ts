import { TestBed } from '@angular/core/testing';

import { LecturerServiceService } from './lecturer-service.service';

describe('LecturerServiceService', () => {
  let service: LecturerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
