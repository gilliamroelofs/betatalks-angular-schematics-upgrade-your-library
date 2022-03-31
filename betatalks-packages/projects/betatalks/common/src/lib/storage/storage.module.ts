import { ModuleWithProviders, NgModule } from '@angular/core';
import { BtStorageService } from './storage.service';
import { BT_STORAGE_CONFIG_TOKEN, BtStorageStrategy } from './storage.types';



@NgModule({
  declarations: [],
  imports: [],
  providers: [
    BtStorageService
  ]
})
export class BtStorageModule {
  constructor() {}
  static forRoot(strategy: BtStorageStrategy): ModuleWithProviders<BtStorageModule> {
    return {
      ngModule: BtStorageModule,
      providers: [
        { provide: BT_STORAGE_CONFIG_TOKEN, useValue: strategy }
      ]
    };
  }
}
