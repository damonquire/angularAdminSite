import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guards/auth-guard.service';
import { RoleGuard } from '../guards/role-guard.service';
import { SolutionsComponent } from '../solutions/solutions.component';
import {LoginComponent} from '../login/login.component';
export const dashboardRoutes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent},
      {
        path: 'admin', component: AdminComponent,
        data: {role: 'Admin'},
        canActivate: [RoleGuard]
      },
      {
        path: 'solutions', component: SolutionsComponent,
        data: {role: 'Admin'},
        canActivate: [RoleGuard]
      }
    ]
  }
];