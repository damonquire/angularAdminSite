import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }
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
}
