import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Material from '@primeng/themes/material';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { authInterceptor } from './core/api/interceptors/auth.interceptor';
import { DatePipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Material,
        options: {
          darkModeSelector: false || 'none',
        },
      },
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
  ],
};
