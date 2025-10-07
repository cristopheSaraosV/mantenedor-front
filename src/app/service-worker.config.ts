import { provideServiceWorker } from '@angular/service-worker';

export const serviceWorkerProviders = [
  provideServiceWorker('ngsw-worker.js', {
    enabled: true,
    registrationStrategy: 'registerWhenStable:30000'
  })
];
