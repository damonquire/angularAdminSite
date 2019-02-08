import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }
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
}
