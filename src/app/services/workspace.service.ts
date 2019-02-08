import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceService {

  constructor() { }
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
}
