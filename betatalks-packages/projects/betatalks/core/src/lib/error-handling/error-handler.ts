import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { BtErrorService } from '../services/error.service';
import { BtCoreConfig, BT_CORE_CONFIG_TOKEN } from '../config/core-config';

@Injectable()
export class BtErrorHandler implements ErrorHandler {

  // Because the ErrorHandler gets loaded early, it is not possible to use
  // dependency injection in the constructor to get other services.
  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const chunkFailedMessage = /Loading chunk [\d]+ failed/;

    if (chunkFailedMessage.test(error.message)) {
       // client has old cache, force reload
      window.location.reload();
      return;
    }

    const errorService = this.injector.get<BtErrorService>(BtErrorService);
    const config = this.injector.get<BtCoreConfig>(BT_CORE_CONFIG_TOKEN);

    errorService.logError(error);

    if (config.rethrowErrors) {
      throw error;
    }

  }

}
