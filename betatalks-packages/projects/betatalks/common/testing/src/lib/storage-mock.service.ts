import { Injectable } from '@angular/core';

@Injectable()
export class BtStorageMockService {
  private storage = new Map<string, any>();
  public history: { action: 'set' | 'remove' | 'get' | 'key' | 'clear', value?: any }[] = [];

  public resetHistory(): void {
    this.history = [];
  }

  public clear(): void {
    this.history.push({ action: 'clear' });
    this.storage.clear();
  }

  public getItem<T>(key: string): T | null {
    this.history.push({ action: 'get' });
    return this.storage.get(String(key)) as T ?? null
  }

  public key(index: number): string | null {
    this.history.push({ action: 'key' });
    return [...this.storage.keys()][Number(index)] ?? null;
  }

  public removeItem(key: string): void {
    this.history.push({ action: 'remove' });
    this.storage.delete(String(key));
  }

  public setItem(key: string, value: any): void {
    this.history.push({ action: 'set' });
    this.storage.set(String(key), String(value));
  }
  
}
