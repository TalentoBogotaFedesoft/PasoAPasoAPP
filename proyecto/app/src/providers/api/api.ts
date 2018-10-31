import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, catchError, mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

export interface User {
  name: string;
  email: string;
  role: string;
  token: string;
}

@Injectable()
export class ApiProvider {
  private url: string;
  private currentUser: User;

  constructor(public http: HttpClient, private storage: Storage) {
    this.url = 'https://pasoapasoapp.herokuapp.com/api';
  }

  public loginAdmin(params): Observable<any> {
    return this.http.post(`${this.url}/auth_admin`, {
      auth: params
    }).pipe(
      map((response: any) => {
        this.currentUser.token = response.jwt;
        return true;
      }),
      mergeMap((response) => this.getAdmin()),
      map((response) => {
        this.saveUser(response.name, response.role, response.email);
        return true;
      })
      , catchError(() => {
        return Observable.of(false);
      }))
  }

  public loginUser(params): Observable<boolean> {
    return this.http.post(`${this.url}/auth_user`, {
      auth: params
    }).pipe(
      map((response: any) => {
        this.currentUser.token = response.jwt;
        return true;
      }),
      mergeMap((response) => this.getUser()),
      map((response) => {
        this.saveUser(response.name, "user", response.email);
        return true;
      })
      , catchError(() => {
        return Observable.of(false);
      }))
  }

  public registerUser(params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/user`, {
      user: params
    }).pipe(map(() => {
      return true;
    }), catchError(() => {
      return Observable.of(false);
    }))
  }

  public registerAdmin(params): Observable<boolean> {
    return this.http.post(`${this.url}/v1/admin`,
      { admin: params }, {
        headers: {
          'Authorization': this.currentUser.token
        }
      }).pipe(map(() => {
        return true;
      }), catchError(() => {
        return Observable.of(false);
      }))
  }

  public updateUser(params): Observable<boolean> {
    return this.http.patch(`${this.url}/v1/user/1`,
      { user: params }, {
        headers: {
          'Authorization': this.currentUser.token
        }
      }).pipe(map((response) => {
        return true;
      }), catchError((error: HttpErrorResponse) => {
        return Observable.of(false);
      }))
  }

  public getRole(): string {
    return this.currentUser.role;
  }

  public getCurrentUser(): User {
    return this.currentUser;
  }

  public logout(): void {
    this.storage.remove('user').then(() => {
      this.currentUser = {
        name: "",
        email: "",
        role: "",
        token: ""
      };
    });
  }

  public loadUser(): Promise<boolean> {
    return this.storage.get('user').then((value) => {
      if (value === null) {
        this.currentUser = {
          name: "",
          email: "",
          role: "",
          token: ""
        };
      } else {
        this.currentUser = value;
      }
      return true;
    });
  }

  public getUser(): Observable<any> {
    return this.http.get(`${this.url}/v1/user/1`, {
      headers: {
        'Authorization': this.currentUser.token
      }
    }).pipe(map((response) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));

  }

  public getAdmin(): Observable<any> {
    return this.http.get(`${this.url}/v1/admin/1`, {
      headers: {
        'Authorization': this.currentUser.token
      }
    }).pipe(map((response) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));

  }

  public deleteAdmin(personal_id): Observable<boolean> {
    return this.http.request('delete', `${this.url}/v1/admin/1`, {
      body: { personal_id },
      headers: {
        'Authorization': this.currentUser.token
      }
    }).pipe(map((response) => {
      return true;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));

  }

  private saveUser(name, role, email) {
    this.currentUser.name = name;
    this.currentUser.role = role;
    this.currentUser.email = email;
    this.storage.set('user', this.currentUser);
  }

  public getRoutes(): Observable<any> {
    return this.http.get(`${this.url}/v1/route`).pipe(map((response) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }

  public getRouteStops(route): Observable<any> {
    return this.http.get(`${this.url}/v1/route/${route.id}/route_stop`).pipe(map((response) => {
      return response;
    }), catchError((error: HttpErrorResponse) => {
      return Observable.of(false);
    }));
  }


}
