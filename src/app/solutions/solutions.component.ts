import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }

}
