import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {Observable, pipe, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import decode from 'jwt-decode';
import { forEach } from '@angular/router/src/utils/collection';
import { AppModule } from '../app.module';
import { stringify } from '@angular/core/src/render3/util';

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
    window.location.href = 'https://www.podio.com/oauth/authorize?response_type=token&client_id=angular&redirect_uri=https://owaikpgv.github.stackblitz.io/dashboard/admin&state=Success';
    //set as regular user regardless
    sessionStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);
  
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
    const urlHash=window.location.hash.substring(1);
    var split=urlHash.split('&');
    var accessToken=split[0].substring(split[0].indexOf('=')+1);

    if(accessToken!=null)
    {
      //set as admin user
      sessionStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);
      /*document.getElementById("test").innerHTML = 
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
      "<tr><td><b>Token Type: </b></td>"+"<td>"+tokenType+"</td></tr>";*/
      //document.getElementById("test").style.display="none";
      //document.getElementById("form").style.display="block";
      const urlHash=window.location.hash.substring(1);
      var split=urlHash.split('&');
      var accessToken=split[0].substring(split[0].indexOf('=')+1);
      var Http = new XMLHttpRequest();
      const url="https://api.podio.com/user";
      Http.open("GET", url);
      Http.setRequestHeader("Authorization", "OAuth2 "+accessToken);
      Http.send();
      Http.onreadystatechange=(e)=>
      {
        var json=JSON.parse(Http.response);
        document.getElementById("userName").innerHTML="<b>"+json.mail+"</b>";
      }
      
    var Http2 = new XMLHttpRequest();
    Http2.open("GET", "https://api.podio.com/org");
    Http2.setRequestHeader("Authorization", "OAuth2 "+accessToken);
    Http2.send();
    var orgs;
    var text:String;
    var admin:boolean=false;
    Http2.onreadystatechange=(e)=>
    {
      orgs=JSON.parse(Http2.responseText);
      var options = orgs;


      // Get dropdown element from DOM
      var select = document.getElementById("selectNumber");
      
      // Loop through the array
      
      for(var i = 0; i < options.length; i++) 
      {
        
        var opt = options[i];
        if(!select.innerHTML.includes(opt.name))
        {
          //check to see if admin... if so... allow sellection
          if(opt.role.includes("regular"))//change to admin when not running locally
          {
            select.innerHTML += "<option value=\"" + opt.name + "\">" + opt.name + "</option>";
            document.getElementById("notAdminButton").style.display="inline";
            admin=true;
          }
          else
          {
            select.innerHTML += "<option disabled value=\"" + opt.name + "\">" + opt.name + "</option>";
          }
        }
      }
      console.log("Admin="+admin);
      if(!admin)
      {
          document.getElementById("admin").innerHTML="We're sorry. It seems you are not an admin of any Podio organization. Please make sure you are logged into the correct Podio account!";
      } 
    
    }
  }
}
GetWorkspaces()
{
  var select2 = document.getElementById("selectW");
  select2.innerHTML=" ";
  const urlHash=window.location.hash.substring(1);
  var split=urlHash.split('&');
  var accessToken=split[0].substring(split[0].indexOf('=')+1);
  document.getElementById("workspaces").style.display="block";
  var select =  (<HTMLInputElement>document.getElementById("selectNumber")).value;
  console.log(select);
  var Http2 = new XMLHttpRequest();
    Http2.open("GET", "https://api.podio.com/org");
    Http2.setRequestHeader("Authorization", "OAuth2 "+accessToken);
    Http2.send();
    var orgs;
    var text:String;
    
    Http2.onreadystatechange=(e)=>
    {
      orgs=JSON.parse(Http2.responseText);
      var options = orgs;
      
      
      // Loop through the array
      for(var i in options) 
      {
        var opt = options[i];
        console.log("Checking to see if option="+select);
        if(opt.name==select)
        {
          for (var i in opt.spaces)
          { 
            var ws=opt.spaces[i];
            console.log("Checking to see if "+select2.innerHTML+" includes "+ws.name.trim())
            if(!select2.innerHTML.includes(ws.name.trim()))
            {
            select2.innerHTML += "<option value=\"" + ws.name + "\">" + ws.name + "</option>";
            }
          }
        }
        
      
      } 
    
    }
}

  CallPodioApi(urlString:string, titleString:string)
  {
    const urlHash=window.location.hash.substring(1);
    var split=urlHash.split('&');
    var accessToken=split[0].substring(split[0].indexOf('=')+1);
    const Http = new XMLHttpRequest();
    const url=urlString;
    Http.open("GET", url);
    Http.setRequestHeader("Authorization", "OAuth2 "+accessToken);
    Http.send();
    var orgs;
    var text;
    Http.onreadystatechange=(e)=>
    {
      orgs=JSON.parse(Http.responseText);
      document.getElementById("results").innerHTML="<span style=\"font-size: 20px\">"+titleString+"</span><b></b><br>"+JSON.stringify(orgs, undefined, 2);
    }
    
  }
  GetUser()
  { 
    this.CallPodioApi("https://api.podio.com/user","User info:");
  }
  GetItem()
  {
    var inputValue = (<HTMLInputElement>document.getElementById("itemIdBox")).value;
    this.CallPodioApi("https://api.podio.com/item/"+inputValue,"Item info for Item with ID "+inputValue+":");
  }
  GetApp()
  {
    var inputValue = (<HTMLInputElement>document.getElementById("appIdBox")).value;
    this.CallPodioApi("https://api.podio.com/app/"+inputValue,"App info for App with ID "+inputValue+":");
  }
  GetApps()
  {
    this.CallPodioApi("https://api.podio.com/app","All App(s) information:");
  }
  GetOrganizations()
  {
    const urlHash=window.location.hash.substring(1);
    var split=urlHash.split('&');
    var accessToken=split[0].substring(split[0].indexOf('=')+1);
    const Http = new XMLHttpRequest();
    Http.open("GET", "https://api.podio.com/org");
    Http.setRequestHeader("Authorization", "OAuth2 "+accessToken);
    Http.send();
    var orgs;
    var text:String;
    Http.onreadystatechange=(e)=>
    {
      orgs=JSON.parse(Http.responseText);
      for (var i in orgs)
      {
        console.log(orgs[i].name);
        if(orgs[i].name!=""&&orgs[i].name!=null)    
        {
          text+=orgs[i].name+" ";
        }
      } 
    var textfinal=text.replace("undefined","");
    document.getElementById("results").innerHTML=textfinal;
    }
  }
  SaveSolution()
  {
    var solutionName=(<HTMLInputElement>document.getElementById("solutionName")).value;
    //is only grabbing one selection its seems... need work around
    var selectedWorkspaces=(<HTMLSelectElement>document.getElementById("selectW")).selectedOptions;
    var wsText:string="";
    for(var i in selectedWorkspaces)
    {
      if(selectedWorkspaces[i].innerHTML!=""&&selectedWorkspaces[i].innerHTML!=null)   
      wsText+=selectedWorkspaces[i].innerHTML.replace("&amp;","&")+",";
    }
    console.log("LOOK HERE: "+wsText);
    var select2 = document.getElementById("selectW");
    var solutionText:string;
    solutionText="";
    const urlHash=window.location.hash.substring(1);
    var split=urlHash.split('&');
    var accessToken=split[0].substring(split[0].indexOf('=')+1);
    document.getElementById("workspaces").style.display="block";
    var select =  (<HTMLInputElement>document.getElementById("selectNumber")).value;
    console.log(select);
    var Http2 = new XMLHttpRequest();
      Http2.open("GET", "https://api.podio.com/org");
      Http2.setRequestHeader("Authorization", "OAuth2 "+accessToken);
      Http2.send();
      var orgs;
      var text:String;
      
      Http2.onreadystatechange=(e)=>
      {
        orgs=JSON.parse(Http2.responseText);
        var options = orgs;
        
        
        // Loop through the array
        for(var i in options) 
        {
          var opt = options[i];
          console.log("Checking to see if option="+select);
          if(opt.name==select)
          {
            for (var i in opt.spaces)
            { 
              var ws=opt.spaces[i];
              var text:string;
              text=ws.name;
              if(wsText.includes(text)&&!solutionText.includes(JSON.stringify(ws)))
              {
                solutionText+=JSON.stringify(ws);
              
              }
            }
          }
          
        
        } 
        console.log("Found it:"+JSON.stringify(ws));
        var solutionDict=[];
        solutionDict.push(
        {
        key:solutionName,
        value:solutionText
        }        
      )
      
      console.log(JSON.stringify(solutionDict));
      }
    
    
  }
}
