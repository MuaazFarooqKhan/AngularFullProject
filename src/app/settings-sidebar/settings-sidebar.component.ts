import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  dropdown: RouteInfo[];
}

export const ROUTES: RouteInfo[] = [

  { path: 'profile', title: 'Profile', icon: 'nc-album-2', class: '', dropdown: [] },
  {
    path: '', title: 'Employee', icon: 'nc-badge', class: '',
    dropdown: [
      { path: 'add-employee', title: "Add Employee", icon: 'fas fa-user-plus', class: '', dropdown: [] },
      { path: 'view-employee', title: "View Employee", icon: 'fas fa-address-card', class: '', dropdown: [] },
    ]
  },
  {
    path: '', title: 'Roles & Permissions', icon: 'nc-bullet-list-67', class: '',
    dropdown: [
      { path: 'add-role', title: "Add Role", icon: 'fas fa-briefcase', class: '', dropdown: [] },
      { path: 'view-roles', title: "View Roles", icon: 'fas fa-users-cog', class: '', dropdown: [] },
    ]
  },
  { path: '../admin/dashboard', title: 'Back', icon: 'nc-minimal-left', class: '', dropdown: [] },

];
@Component({
  moduleId: module.id,
  selector: 'settings-sidebar-cmp',
  templateUrl: './settings-sidebar.component.html',
  styleUrls: ['./settings-sidebar.component.scss'],
  animations: [
    trigger('openClose', [
        transition('void <=> *', [
            style({ opacity: 0 }),
            animate(1000, style({opacity:1}))
        ]),
    ]),
],
})
export class SettingsSidebarComponent implements OnInit {
  public menuItems: any[];
  showRnP = false;
  showEmp = false;
  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  toggleRnP(){
    this.showRnP=!this.showRnP;
    console.log(this.showRnP);
  }
  toggleEmp(){
    this.showEmp=!this.showEmp;
    console.log(this.showEmp);
  }

}
