import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    dropdown: RouteInfo[]
}

export const ROUTES: RouteInfo[] = [
    { path: '/admin/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '', dropdown: [] },
    { path: '/admin/inventory', title: 'Inventory', icon: 'nc-app', class: '', dropdown: [] },
    {
        path: '', title: 'POS', icon: 'nc-sound-wave', class: 'dropdown-toggle',
        dropdown: [
            { path: '/admin/pos', title: 'Add Sale', icon: 'fas fa-pen-square', class: '', dropdown: [] },
            { path: '/admin/view-sales', title: 'View Sales', icon: 'fas fa-chart-bar', class: '', dropdown: [] },
        ]
    },
    { path: '/admin/broadcast', title: 'Broadcast', icon: 'nc-spaceship', class: '', dropdown: [] },
    { path: '/admin/global-b2b', title: 'Search Entire Plaza', icon: 'nc-mobile', class: '', dropdown: [] },
    { path: '/admin/report', title: 'Report', icon: 'nc-bank', class: '', dropdown: [] },
    // { path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    // { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.css'],
    animations: [
        trigger('openClose', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate(1000, style({opacity:1}))
            ]),
        ]),
    ],
})

export class SidebarComponent implements OnInit {
    show = false;
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    toggle() {
        this.show = !this.show;
        console.log(this.show);
    }
}
