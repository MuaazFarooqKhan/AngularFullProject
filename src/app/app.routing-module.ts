import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { SettingsLayoutComponent } from './layouts/settings-layout/settings-layout.component';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'settings',
    loadChildren: () => import('./layouts/settings-layout/settings-layout.module').then(mod => mod.SettingsLayoutModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(mod => mod.AdminLayoutModule),
    // component: AdminLayoutComponent,
    //   children: [
    //       {
    //     path: '',
    //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    // }]
  },
  {
    path: '**',
    component: LoginComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(AppRoutes, {useHash : true}),
  ],

  exports:[
    RouterModule
  ],
  declarations:[],
})
export class AppRoutingModule{}
