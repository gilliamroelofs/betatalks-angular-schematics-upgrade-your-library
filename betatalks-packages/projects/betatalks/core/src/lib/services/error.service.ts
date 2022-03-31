import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { BtErrorLoggingService } from './error-logging.service';

@Injectable({
  providedIn: 'root'
})
export class BtErrorService {

  constructor(
    private errorLoggingService: BtErrorLoggingService,
    private locationStrategy: LocationStrategy) { }

  public logError(error: any) {
    // Do some decent error handling. Possible interesting package: stacktrace.js
    // See: https://github.com/stacktracejs/stacktrace.js
    const location = this.locationStrategy;
    const url = location !== null ? location.path() : '-unknown-';
    this.errorLoggingService.logException(error, url);
  }

}
