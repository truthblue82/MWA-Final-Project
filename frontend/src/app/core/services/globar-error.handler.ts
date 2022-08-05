import { ErrorHandler, Injectable, Injector } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {


    constructor(private injector: Injector) { }

    handleError(error: Error) {
        const err = {
            message: error.message ? error.message : error.toString(),
            stack: error.stack ? error.stack : ''
        };

        // Re-throw the error
        throw error;
    }
}
