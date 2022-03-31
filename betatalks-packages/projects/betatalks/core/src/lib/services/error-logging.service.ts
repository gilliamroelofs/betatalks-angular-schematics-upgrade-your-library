import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BtErrorLoggingService {

  constructor() { }

  /**
   * Logs an exception to an external service for processing
   * @param error The error that has to be logged.
   * @param url The location where the error occured.
   */
  public logException(error: any, url: string) {
    // TODO: something cool with logging the exception here
  }

}
