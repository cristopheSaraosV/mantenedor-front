import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { App } from './app/app';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(withInterceptors([
      (req, next) => {
        // Obtener el token del localStorage
        const token = localStorage.getItem('access_token');
        
        // Clonar la request y agregar headers
        let modifiedReq = req.clone({
          withCredentials: true
        });

        // Si hay token, agregarlo al header Authorization
        if (token) {
          modifiedReq = modifiedReq.clone({
            setHeaders: {
              'Authorization': `Bearer ${token}`
            }
          });
        }

        return next(modifiedReq);
      }
    ])),
    provideRouter(routes)
  ]
});
