import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { flatten } from '@angular/compiler';

enum RoleType {
  default,
  user,
  admin,
};
@Injectable()
export class ApiProvider {
  private url: string;
  private user: Array<any>;
  public RoleType:RoleType;
  private role: RoleType;
  public token: string;

  constructor(public http: HttpClient) {
    this.url = 'http://localhost:3000/api'
    this.token = localStorage.getItem('token');
    this.role = RoleType.default;
  }

  public loginAdmin(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth_admin`, {
      auth: params
    }).pipe(map((response: any) => {
      localStorage.setItem('token', response.jwt);
      this.token = response.jwt;
      this.role = RoleType.admin;
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }

  public loginUser(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth_user`, {
      auth: params
    }).pipe(map((response: any) => {
      localStorage.setItem('token', response.jwt);
      this.token = response.jwt;
      this.role = RoleType.user;
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }

  public getRole(){
    return this.role;
  }

  public logout(): void {
    this.token = undefined;
  }


}
