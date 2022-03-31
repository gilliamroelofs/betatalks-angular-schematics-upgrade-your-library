export class BtStorage {

  constructor(
    private storage: Storage) { }

  public clear(): void {
    this.storage.clear();
  }

  public getItem<T>(key: string): T | null {
    const raw = this.storage.getItem(key);
    return raw !== null ? JSON.parse(raw) : null;
  }

  public key(index: number): string | null {
    return this.storage.key(index);
  }

  public removeItem(key: string): void {
    this.storage.removeItem(key);
  }

  public setItem(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

}