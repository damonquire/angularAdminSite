import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'
import {OrganizationService} from '../../services/organization.service';
import {AppService} from '../../services/app.service';
import {UserService} from '../../services/user.service';
import {SolutionService} from '../../services/solution.service';
import {WorkspaceService} from '../../services/workspace.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
     private _authService: AuthService,
     private _organizationService:OrganizationService,
     private _appService:AppService,
     private _userService:UserService,
     private _solutionService:SolutionService,
     private _workspaceService:WorkspaceService) { }

  ngOnInit() {
    this._solutionService.GenerateSolutionForm();
  }
  GetUser()
  {
    this._userService.GetUser();
  }
  GetApp()
  {
    this._appService.GetApp();
  }
  GetApps()
  {
    this._appService.GetApps();
  }
  GetOrganizations()
  {
    this._organizationService.GetOrganizations();
  }
  GetWorkspaces()
  {
    this._workspaceService.GetWorkspaces();
  }
  SaveSolution()
  {
    this._solutionService.SaveSolution();
  }
  GenerateSolutionID()
  {
    this._solutionService.GenerateSolutionID();
  }

}
