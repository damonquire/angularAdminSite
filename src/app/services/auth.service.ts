import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import decode from 'jwt-decode';
import { forEach } from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private message: string;

  constructor(private _router: Router) { }

  /**
   * this is used to clear anything that needs to be removed
   */
  clear(): void {
    sessionStorage.clear();
  }

  /**
   * check for expiration and if token is still existing or not
   * @return {boolean}
   */
  isAuthenticated(): boolean {
    return sessionStorage.getItem('token') != null && !this.isTokenExpired();
  }

  // simulate jwt token is valid
  // https://github.com/theo4u/angular4-auth/blob/master/src/app/helpers/jwt-helper.ts
  isTokenExpired(): boolean {
    return false;
  }

  loginAdmin(): void {
    //this._router.navigateByUrl('../podio.com/oauth/authorize?client_id=angular-test&redirect_uri=http://localhost:4200');
    window.location.href = 'https://www.podio.com/oauth/authorize?response_type=token&client_id=angular&redirect_uri=http://localhost:4200/dashboard';
    //set as regular user regardless
    sessionStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`);
  }

  login(): void {
    sessionStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20ifQ.GA0Y9gYIjmx1jLwuRHuBgZ8m6o-NgkD84nO0ym68CWo`);
    this._router.navigate(['/dashboard']);
  }

  /**
   * this is used to clear local storage and also the route to login
   */
  logout(): void {
    this.clear();
    this._router.navigate(['/login']);
  }

  decode() {
    return decode(sessionStorage.getItem('token'));
  }
  checkIfCodeExists()
  {
    const urlParams = new URLSearchParams(window.location.hash);
    const urlHash=window.location.hash.substring(1);
    var split=urlHash.split('&');
    var accessToken=split[0].substring(split[0].indexOf('=')+1);
    var expiresIn=split[1].substring(split[1].indexOf('=')+1);
    var refID=split[2].substring(split[2].indexOf('=')+1);
    var refType=split[3].substring(split[3].indexOf('=')+1);
    var refreshToken=split[4].substring(split[4].indexOf('=')+1);
    var scope=split[5].substring(split[5].indexOf('=')+1);
    var state=split[6].substring(split[6].indexOf('=')+1);
    var tokenType=split[7].substring(split[7].indexOf('=')+1);
    if(accessToken!=null)
    {
      //set as admin user
      sessionStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);
      document.getElementById("test").innerHTML = 
      "<style>th, td {padding: 15px;text-align: left;}table#t01 {width: 100%;background-color: #f1f1c1;}</style>"
      +
      "<table>"+
      "<tr><td><b>Access Token: </b></td><td>"+accessToken+"</td></tr>"+
      "<tr><td><b>Expires in: </b></td><td>"+expiresIn+"</td></tr>"+
      "<tr><td><b>Ref ID: </b></td>"+"<td>"+refID+"</td></tr>"+
      "<tr><td><b>Ref Type: </b></td>"+"<td>"+refType+"</td></tr>"+
      "<tr><td><b>Refresh Token: </b></td>"+"<td>"+refreshToken+"</td></tr>"+
      "<tr><td><b>Scope: </b></td>"+"<td>"+scope+"</td></tr>"+
      "<tr><td><b>State: </b></td>"+"<td>"+state+"</td></tr>"+
      "<tr><td><b>Token Type: </b></td>"+"<td>"+tokenType+"</td></tr>"+
      "</table><br></body>";
    }
  }
}