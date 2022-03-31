import { TestBed } from '@angular/core/testing';

import { BtErrorLoggingService } from './error-logging.service';

describe('BtErrorLoggingService', () => {
  let service: BtErrorLoggingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtErrorLoggingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
