import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription, ReplaySubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@shared/models/user';
import { HttpClient, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
//import { isEmpty } from 'lodash-es';
import { ApiService } from '@services/api/api.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService implements HttpInterceptor {
  public currentUserSubject: BehaviorSubject<User>;
  public userCheckSubject: ReplaySubject<boolean>;
  private refreshCheckSubject: BehaviorSubject<boolean>;
  private userDataStoreSubscription: Subscription;

  constructor(private apiService: ApiService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(null);
    this.userCheckSubject = new ReplaySubject<boolean>(1);
    this.refreshCheckSubject = new BehaviorSubject<boolean>(false);
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get refreshInProgress(): boolean {
    return this.refreshCheckSubject.value;
  }

  public set refreshInProgress(status: boolean) {
    this.refreshCheckSubject.next(status);
  }

  login(forData): Observable<any> {
    return this.http.post('https://sol-50.eu/soldraftserver/?cmd=project.GetProjects', forData);
  }

  logout(): Observable<any> {
    return this.apiService
      .post('https://soldraft.com/spx_web/soldraft/backend/flex_request.php?cmd=logout', 'path', {})
      .pipe(map(user => user));
    // const { endpoint, path, data } = logoutPath(refreshToken);
    // return this.apiService.post(endpoint, path, data);
  }
}
