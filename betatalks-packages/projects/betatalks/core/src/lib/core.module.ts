import { ErrorHandler, ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { BtCoreConfig, BT_CORE_CONFIG_TOKEN } from './config/core-config';
import { BtErrorHandler } from './error-handling/error-handler';

function createConfig(partial?: Partial<BtCoreConfig>): BtCoreConfig {
  let config = {
    rethrowErrors: false,
  }
  if (partial) {
    config = {
      ...config,
      ...partial
    };
  }

  return config;
}

@NgModule({
  imports: [],
  providers: [
    { provide: BT_CORE_CONFIG_TOKEN, useValue: createConfig() },
    { provide: ErrorHandler, useClass: BtErrorHandler }
  ]
})
export class BtCoreModule {
  constructor(@Optional() @SkipSelf() parentModule: BtCoreModule) {
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import BtCoreModule in the root module only.`);
    }
  }

  static forRoot(config?: Partial<BtCoreConfig>): ModuleWithProviders<BtCoreModule> {
    return {
      ngModule: BtCoreModule,
      providers: [
        { provide: BT_CORE_CONFIG_TOKEN, useValue: createConfig(config) },
        { provide: ErrorHandler, useClass: BtErrorHandler }
      ]
    };
  }
}
