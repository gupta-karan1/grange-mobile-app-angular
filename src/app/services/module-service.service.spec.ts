import { TestBed } from '@angular/core/testing';

import { ModuleServiceService } from './module-service.service';

describe('ModuleServiceService', () => {
  let service: ModuleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModuleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
