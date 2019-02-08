import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor() { }
  dropdown()
  {
   var drop= document.getElementById('userDrop');
   var user=window.location.hash.split('&')[8].substring(window.location.hash.split('&')[8].indexOf("=")+1);
   if(!window.location.href.includes('login')||!window.URL.toString().includes('login'))
   {
     drop.style.display="block";
     drop.innerHTML=user.split('@')[0].substring(0,1).toUpperCase()+user.split('@')[0].substring(1)+"&#9660;";
     
   }
  }
}
