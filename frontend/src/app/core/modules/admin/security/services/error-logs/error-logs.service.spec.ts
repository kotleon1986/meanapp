import { TestBed, inject } from '@angular/core/testing';

import { ErrorLogsService } from './error-logs.service';

describe('ErrorLogsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ErrorLogsService]
    });
  });

  it('should be created', inject([ErrorLogsService], (service: ErrorLogsService) => {
    expect(service).toBeTruthy();
  }));
});
