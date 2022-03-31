import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { BtInMemoryStorage } from './in-memory-storage';
import { BtStorage } from './storage';
import { BT_STORAGE_CONFIG_TOKEN, BtStorageStrategy } from './storage.types';

@Injectable()
export class BtStorageService  {

  private storage!: BtStorage;

  private subjectEvent = new Subject<string>();

  constructor(
    @Inject(BT_STORAGE_CONFIG_TOKEN) strategy: BtStorageStrategy) {
    this.setStorage(strategy);
  }

  public clear(): void {
    this.subjectEvent.next(`clear`);
    this.storage.clear();
  }

  public getItem<T>(key: string): T | null {
    this.subjectEvent.next(`getItem: ${key}`);
    return this.storage.getItem<T>(key);
  }

  public key(index: number): string | null {
    this.subjectEvent.next(`key: ${index}`);
    return this.storage.key(index);
  }

  public removeItem(key: string): void {
    this.subjectEvent.next(`removeItem: ${key}`);
    return this.storage.removeItem(key);
  }

  public setItem(key: string, value: any): void {
    this.subjectEvent.next(`setItem: ${key}, ${value}`);
    return this.storage.setItem(key, value);
  }

  public events(): Observable<string> {
    return this.subjectEvent.asObservable();
  }

  public setStorage(strategy: BtStorageStrategy): void {
    switch(strategy) {
      case 'local': {
        this.storage = new BtStorage(localStorage);
        break;
      }
      case 'session': {
        this.storage = new BtStorage(sessionStorage);
        break;
      }
      default: {
        this.storage = new BtStorage(new BtInMemoryStorage());
        break;
      }
    }
  }

}
