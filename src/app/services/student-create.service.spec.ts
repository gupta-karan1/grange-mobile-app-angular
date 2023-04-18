import { TestBed } from '@angular/core/testing';

import { StudentCreateService } from './student-create.service';

describe('StudentCreateService', () => {
  let service: StudentCreateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCreateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
