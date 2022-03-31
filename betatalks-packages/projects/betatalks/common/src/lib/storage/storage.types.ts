import { InjectionToken } from "@angular/core";

export type BtStorageStrategy = 'local' | 'session' | 'inMemory';
export const BT_STORAGE_CONFIG_TOKEN = new InjectionToken<BtStorageStrategy>('BtStorageStrategy');
