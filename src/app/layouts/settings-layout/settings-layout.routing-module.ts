import { SettingsLayoutComponent } from './settings-layout.component';
import { ViewEmployeeComponent } from '../../pages/view-employee/view-employee.component';
import { ViewRolesComponent } from '../../pages/view-roles/view-roles.component';
import { AddEmployeeComponent } from '../../pages/add-employee/add-employee.component';
import { RolesComponent } from '../../pages/roles/roles.component';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from 'app/pages/settings/settings.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

const SettingsLayoutRoutes: Routes = [
  {
    path: '',
    component: SettingsLayoutComponent,
    children: [{
      path: '',
      children: [
        { path: 'profile', component: SettingsComponent },
        { path: 'add-employee', component: AddEmployeeComponent },
        { path: 'add-role', component: RolesComponent },
        { path: 'view-roles', component: ViewRolesComponent },
        { path: 'view-employee', component: ViewEmployeeComponent }
      ]
    }]
  },

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsLayoutRoutes),
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
})
export class SettingsLayoutRoutingModule { }