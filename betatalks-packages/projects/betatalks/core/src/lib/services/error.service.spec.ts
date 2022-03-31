import { TestBed } from '@angular/core/testing';

import { BtErrorService } from './error.service';

describe('BtErrorService', () => {
  let service: BtErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
