import { Injectable } from '@angular/core';
import { config } from '../config/config';

import { Observable, Subject } from 'rxjs';
import { tap, delay } from 'rxjs/operators';
import { Profile } from "../models/profile.model";
import {HttpClient,  HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  isLoggedIn: boolean = false;
  profile = new Subject<Profile>();
  redirectUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  login(input: object): Observable<Profile> {
    return this.http.post<Profile>(`${config.server.host}${config.server.api}login`, input, this.httpOptions).pipe(
      tap(val => {
        if (val) {
          this.isLoggedIn = true;
          this.profile.next(val);
        }
      })
    );
  }

  registration(input: object): Observable<Profile> {
    return this.http.post<Profile>(`${config.server.host}${config.server.api}registration`, input, this.httpOptions).pipe(
      tap(val => {
        if (val) {
          this.isLoggedIn = true;
          this.profile.next(val);
        }
      })
    );
  }

  logout(): void {
    this.profile.next(null);
    this.isLoggedIn = false;
  }
}
