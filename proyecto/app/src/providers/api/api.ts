import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { flatten } from '@angular/compiler';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  private url: string;
  public token: string;

  constructor(public http: HttpClient) {
    this.url = 'http://localhost:3000/api'
    this.token = localStorage.getItem('token');
  }

  public loginAdmin(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth_admin`, {
      auth: params
    }).pipe(map((response: any) => {
      localStorage.setItem('token', response.jwt);
      this.token = response.jwt;
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }

  public logout(): void {
    this.token = undefined;
  }


}
