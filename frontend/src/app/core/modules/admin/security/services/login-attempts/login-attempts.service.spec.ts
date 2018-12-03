import { TestBed, inject } from '@angular/core/testing';

import { LoginAttemptsService } from './login-attempts.service';

describe('LoginAttemptsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginAttemptsService]
    });
  });

  it('should be created', inject([LoginAttemptsService], (service: LoginAttemptsService) => {
    expect(service).toBeTruthy();
  }));
});
