import { InjectionToken } from '@angular/core';

export interface BtCoreConfig {
  rethrowErrors?: boolean;
}

export const BT_CORE_CONFIG_TOKEN = new InjectionToken<BtCoreConfig>('BtCoreConfig');
