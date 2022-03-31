import { TestBed } from '@angular/core/testing';

import { BtStorageService } from './storage.service';
import { BT_STORAGE_CONFIG_TOKEN } from './storage.types';

describe('BtStorageService', () => {
  let service: BtStorageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BtStorageService,
        { provide: BT_STORAGE_CONFIG_TOKEN, useValue: 'inMemory' }
      ]
    });
    service = TestBed.inject(BtStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
