import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { LoaderService } from '@services/loader/loader.service';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private defaultAPIRequestHeaders = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private apiCalls = 0;

  constructor(private http: HttpClient, private loaderService: LoaderService) {}

  private formatErrors(error: any): any {
    return throwError(error);
  }

  handleLoaderDisplay(operation, displayLoader): void {
    if (displayLoader) {
      if (operation === INCREMENT) {
        this.apiCalls = this.apiCalls + 1;
      } else if (operation === DECREMENT && this.apiCalls !== 0) {
        this.apiCalls = this.apiCalls - 1;
      }
      if (this.apiCalls === 1) {
        this.loaderService.show();
      }
      if (this.apiCalls === 0) {
        this.loaderService.hide();
      }
    }
  }

  get(url: string, path: string, params: HttpParams = new HttpParams(), displayLoader = true, options = {}): Observable<any> {
    this.handleLoaderDisplay(INCREMENT, displayLoader);
    return this.http.get(`${url}/${path}`, { params, ...options }).pipe(
      catchError(this.formatErrors),
      finalize(() => {
        this.handleLoaderDisplay(DECREMENT, displayLoader);
      })
    );
  }

  put(url: string, path: string, body: Record<string, any> = {}, options = {}, displayLoader = true): Observable<any> {
    this.handleLoaderDisplay(INCREMENT, displayLoader);
    const apiOptions = {
      ...this.defaultAPIRequestHeaders,
      ...options
    };
    return this.http.put(`${url}/${path}`, JSON.stringify(body), apiOptions).pipe(
      catchError(this.formatErrors),
      finalize(() => {
        this.handleLoaderDisplay(DECREMENT, displayLoader);
      })
    );
  }

  patch(url: string, path: string, body: Record<string, any> = {}, options = {}, displayLoader = true): Observable<any> {
    this.handleLoaderDisplay(INCREMENT, displayLoader);
    const apiOptions = {
      ...this.defaultAPIRequestHeaders,
      ...options
    };
    return this.http.patch(`${url}/${path}`, JSON.stringify(body), apiOptions).pipe(
      catchError(this.formatErrors),
      finalize(() => {
        this.handleLoaderDisplay(DECREMENT, displayLoader);
      })
    );
  }

  post(url: string, path: string, body: Record<string, any> = {}, options = {}, displayLoader = true): Observable<any> {
    this.handleLoaderDisplay(INCREMENT, displayLoader);
    const apiOptions = {
      ...this.defaultAPIRequestHeaders,
      ...options
    };
    return this.http.post(`${url}/${path}`, body, apiOptions).pipe(
      catchError(this.formatErrors),
      finalize(() => {
        this.handleLoaderDisplay(DECREMENT, displayLoader);
      })
    );
  }

  delete(url: string, path: string, displayLoader = true): Observable<any> {
    this.handleLoaderDisplay(INCREMENT, displayLoader);
    return this.http.delete(`${url}/${path}`).pipe(
      catchError(this.formatErrors),
      finalize(() => {
        this.handleLoaderDisplay(DECREMENT, displayLoader);
      })
    );
  }
}
