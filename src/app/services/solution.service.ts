import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  constructor() { }
  gotosolutions()
  {
    window.location.href='http://localhost:4200/dashboard/solutions'+window.location.hash;
  }
  SaveSolution()
  {
    document.getElementById("saveBtn").innerHTML="<i class=\"fa fa-refresh fa-spin\"></i>Saving";
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
        key:document.getElementById('typing').innerHTML,
        value:solutionText
        }        
      )
      
      console.log(JSON.stringify(solutionDict));
      }
      changeBtn();
      async function sleep(ms)
      {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      async function changeBtn()
      {
        await sleep(2000);
        document.getElementById("saveBtn").innerHTML="Saved!";
        window.location.href = 'http://localhost:4200/dashboard/solutions'+window.location.hash;
      }
      //figure this shizz out
  }
  GenerateSolutionForm()
  {
    const urlHash=window.location.hash.substring(1);
    var split=urlHash.split('&');
    var accessToken=split[0].substring(split[0].indexOf('=')+1);

    if(accessToken!=null)
    {
      //set as admin user
      sessionStorage.setItem('token', `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzMyNzM5NjksImV4cCI6MTU2NDgxMDAwNSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiVGVzdCBHdWFyZCIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJyb2xlIjoiQWRtaW4ifQ.rEkg53_IeCLzGHlmaHTEO8KF5BNfl6NEJ8w-VEq2PkE`);
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
        if(!window.location.href.includes("user="))
        window.location.href+="&user="+json.mail;
        drop.style.display="block";
    var user=window.location.hash.split('&')[8].substring(window.location.hash.split('&')[8].indexOf("=")+1);
    drop.innerHTML=json.mail.split('@')[0].substring(0,1).toUpperCase()+json.mail.split('@')[0].substring(1)+"&#9660;";
      }
      
    var Http2 = new XMLHttpRequest();
    Http2.open("GET", "https://api.podio.com/org");
    Http2.setRequestHeader("Authorization", "OAuth2 "+accessToken);
    Http2.send();
    var orgs;
    var text:String;
    var admin:boolean=false;
    var drop=document.getElementById('userDrop');
    
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
GenerateSolutionID()
{
    var inputBox = (<HTMLInputElement>document.getElementById("solutionName"));
      document.getElementById('typing').innerHTML ="Sol-"+inputBox.value+"-SaaS";
}
}
