import { TestBed } from '@angular/core/testing';

import { StudentDeleteService } from './student-delete.service';

describe('StudentDeleteService', () => {
  let service: StudentDeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentDeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
