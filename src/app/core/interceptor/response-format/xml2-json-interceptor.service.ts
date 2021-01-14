import { NgxXml2jsonService } from 'ngx-xml2json';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class XML2JsonInterceptorService implements HttpInterceptor {
  constructor(private xml2jsonService: NgxXml2jsonService) {}

  intercept(reqs: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const req = reqs.clone({ responseType: 'text' });

    return next.handle(req).pipe(
      map(events => {
        let event = events;
        if (event instanceof HttpResponse && event.headers.get('content-type').indexOf('text/xml;charset=UTF-8') >= 0) {
          const parser = new DOMParser();
          const xml = parser.parseFromString(event.body, 'text/xml');
          event = event.clone({ body: this.xml2jsonService.xmlToJson(xml) });
        } else if (event instanceof HttpResponse && event.headers.get('content-type').indexOf('application/json') >= 0) {
          event = event.clone({ body: JSON.parse(event.body) });
        }

        return event;
      })
    );
  }
}
