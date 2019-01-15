import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <p>
      The page you were trying to reach is only accessible from an Admin account.
      <img src="https://cdn.scotch.io/scotchy-uploads/2014/11/you-shall-not-pass.jpg" alt="Italian Trulli">
    </p>
  `,
  styles: []
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
