import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {SolutionService} from '../services/solution.service';
import {DropdownService} from '../services/dropdown.service';
@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.css']
})
export class UserIconComponent implements OnInit {

  constructor(private _authService: AuthService,
    private _solutionService:SolutionService,
    private _dropdownService:DropdownService) { }

  ngOnInit() {
    this._dropdownService.dropdown();
  }
  logout()
  {
    this._authService.logout();
  }
  gotosolutions()
  {
    this._solutionService.gotosolutions();
  }

}
