import { TestBed } from '@angular/core/testing';

import { StudentUpdateService } from './student-update.service';

describe('StudentUpdateService', () => {
  let service: StudentUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
