import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BtStorageModule, BtStorageService } from '@betatalks/common';
import { BtStorageMockService } from './storage-mock.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BtStorageModule
  ],
  providers: [
    { provide: BtStorageService, useClass: BtStorageMockService }
  ]
})
export class SfStorageTestingModule { }
