import { FixedPluginModule } from './../../shared/fixedplugin/fixedplugin.module';
import { FooterModule } from './../../shared/footer/footer.module';
import { NavbarModule } from './../../shared/navbar/navbar.module';
import { SettingsLayoutComponent } from './settings-layout.component';
import { SettingsSidebarModule } from './../../settings-sidebar/settings-sidebar.module';
import { ViewEmployeeComponent } from './../../pages/view-employee/view-employee.component';
import { ViewRolesComponent } from './../../pages/view-roles/view-roles.component';
import { RolesComponent } from './../../pages/roles/roles.component';
import { SettingsComponent } from './../../pages/settings/settings.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DemoMaterialModule } from 'app/material-module/material-module.module';
import { RouterModule } from '@angular/router';
import { SettingsLayoutRoutingModule } from './settings-layout.routing-module';
import { AddEmployeeComponent } from 'app/pages/add-employee/add-employee.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    SettingsComponent,
    RolesComponent,
    AddEmployeeComponent,
    ViewRolesComponent,
    ViewEmployeeComponent,
    SettingsLayoutComponent,
    ],
  imports: [
    CommonModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DemoMaterialModule,
    CommonModule,
    SettingsSidebarModule,
    FooterModule,
    FixedPluginModule,
    SettingsLayoutRoutingModule
  ],
  exports: [
    RouterModule,
  ]
})
export class SettingsLayoutModule { }
