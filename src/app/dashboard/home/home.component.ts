import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this._authService.checkIfCodeExists();
  }
  GetUser()
  {
    this._authService.GetUser();
  }
  GetItem()
  {
    this._authService.GetItem();
  }
  GetApp()
  {
    this._authService.GetApp();
  }
  GetApps()
  {
    this._authService.GetApps();
  }

}
