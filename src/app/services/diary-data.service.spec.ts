import { TestBed } from '@angular/core/testing';

import { DiaryDataService } from './diary-data.service';

describe('DiaryDataService', () => {
  let service: DiaryDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiaryDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
