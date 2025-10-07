import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, HttpResponse<any>>();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Solo cachear peticiones GET
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    // Verificar si la petición debe ser cacheada
    if (!this.shouldCache(req.url)) {
      return next.handle(req);
    }

    const cachedResponse = this.getCachedResponse(req.url);
    if (cachedResponse) {
      return of(cachedResponse);
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.setCachedResponse(req.url, event);
        }
      })
    );
  }

  private shouldCache(url: string): boolean {
    // Cachear solo peticiones a la API que no sean críticas
    return url.includes('/api/') && 
           !url.includes('/auth/') && 
           !url.includes('/login');
  }

  private getCachedResponse(url: string): HttpResponse<any> | null {
    const cached = this.cache.get(url);
    if (cached && this.isCacheValid(cached)) {
      return cached;
    }
    this.cache.delete(url);
    return null;
  }

  private setCachedResponse(url: string, response: HttpResponse<any>): void {
    const responseWithTimestamp = response.clone({
      body: {
        ...response.body,
        _cachedAt: Date.now()
      }
    });
    this.cache.set(url, responseWithTimestamp);
  }

  private isCacheValid(response: HttpResponse<any>): boolean {
    const cachedAt = response.body?._cachedAt;
    if (!cachedAt) return false;
    
    return Date.now() - cachedAt < this.CACHE_DURATION;
  }
}
