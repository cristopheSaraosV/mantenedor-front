import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([
      (req, next) => {
        req = req.clone({
          withCredentials: true
        });
        return next(req);
      }
    ])),
    provideRouter(routes)
  ]
});
