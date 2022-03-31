export class Compare {
  static isEqual<T = unknown>(a: T, b: T): boolean {
    if (typeof a === 'object') {
      return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
  }
}