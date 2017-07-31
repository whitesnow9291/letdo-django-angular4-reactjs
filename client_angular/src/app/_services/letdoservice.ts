import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { User, Contact } from '../Model/model';

@Injectable()
export class LetDoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private letdoUrl = 'http://localhost:8000/letdoapi';  // URL to web api

  constructor(private http: Http) { }
  signUp(u: User): Promise<any> {
    let authUrl = this.letdoUrl + "/" + "auth/signup";
    return this.http
      .post(authUrl, JSON.stringify({ fullname: u.username, email: u.email, password: u.password }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  logIn(u: User): Promise<any> {
    let authUrl = this.letdoUrl + "/" + "auth/login";
    return this.http
      .post(authUrl, JSON.stringify({ email: u.email, password: u.password }), { headers: this.headers })
      .toPromise()
      .then(res => {
        let user = res.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
      .catch(this.handleError);
  }
  contact(c: Contact): Promise<any> {
    let authUrl = this.letdoUrl + "/" + "contact";
    return this.http
      .post(authUrl, JSON.stringify(c), { headers: this.headers })
      .toPromise()
      .then(res => {
        let user = res.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
      .catch(this.handleError);
  }
  saveCreditProfile(u: User): Promise<any> {
    let authUrl = this.letdoUrl + "/" + "savecreditprofile";
    return this.http
      .post(authUrl, JSON.stringify({ fullname: u.username, email: u.email, password: u.password }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  saveCKeditor(c: String): Promise<any> {
    let authUrl = this.letdoUrl + "/" + "savecontent";
    return this.http
      .post(authUrl, JSON.stringify({ content: c }), { headers: this.headers })
      .toPromise()
      .then(res => res.json())
      .catch(this.handleError);
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }
  //   getUseres(): Promise<User[]> {
  //     return this.http.get(this.UseresUrl)
  //                .toPromise()
  //                .then(response => response.json().data as User[])
  //                .catch(this.handleError);
  //   }


  //   getUser(id: number): Promise<User> {
  //     const url = `${this.UseresUrl}/${id}`;
  //     return this.http.get(url)
  //       .toPromise()
  //       .then(response => response.json().data as User)
  //       .catch(this.handleError);
  //   }

  //   delete(id: number): Promise<void> {
  //     const url = `${this.UseresUrl}/${id}`;
  //     return this.http.delete(url, {headers: this.headers})
  //       .toPromise()
  //       .then(() => null)
  //       .catch(this.handleError);
  //   }

  //   create(name: string): Promise<User> {
  //     return this.http
  //       .post(this.UseresUrl, JSON.stringify({name: name}), {headers: this.headers})
  //       .toPromise()
  //       .then(res => res.json().data as User)
  //       .catch(this.handleError);
  //   }

  //   update(User: User): Promise<User> {
  //     const url = `${this.UseresUrl}/${User.id}`;
  //     return this.http
  //       .put(url, JSON.stringify(User), {headers: this.headers})
  //       .toPromise()
  //       .then(() => User)
  //       .catch(this.handleError);
  //   }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/