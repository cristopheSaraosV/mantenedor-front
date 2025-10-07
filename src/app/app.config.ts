import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { CacheInterceptor } from './interceptors/cache.interceptor';
import { serviceWorkerProviders } from './service-worker.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ 
      eventCoalescing: true,
      runCoalescing: true 
    }),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules)
    ),
    provideAnimationsAsync(),
    provideHttpClient(),
    ...serviceWorkerProviders,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true
    }
  ]
};
