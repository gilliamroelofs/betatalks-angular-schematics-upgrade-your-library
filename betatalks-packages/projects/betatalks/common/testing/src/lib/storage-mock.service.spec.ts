import { TestBed } from '@angular/core/testing';

import { BtStorageMockService } from './storage-mock.service';

describe('BtStorageMockService', () => {
  let service: BtStorageMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BtStorageMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
