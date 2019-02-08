import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {

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
  GetApp()
  {
    var inputValue = (<HTMLInputElement>document.getElementById("appIdBox")).value;
    this.CallPodioApi("https://api.podio.com/app/"+inputValue,"App info for App with ID "+inputValue+":");
  }
  GetApps()
  {
    this.CallPodioApi("https://api.podio.com/app","All App(s) information:");
  }
}
