import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Convertimos la promesa de Preferences en un Observable para usarla en el flujo
    return from(Preferences.get({ key: 'token' })).pipe(
      switchMap(tokenData => {
        if (tokenData.value) {
          // Si hay token, clonamos la petición y le inyectamos el header
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenData.value}`
            }
          });
        }
        // Dejamos pasar la petición (modificada o no)
        return next.handle(request);
      })
    );
  }
}