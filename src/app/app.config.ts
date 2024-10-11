import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {AmortizationService} from "./amortization/amortization.service";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    AmortizationService
  ]
};
