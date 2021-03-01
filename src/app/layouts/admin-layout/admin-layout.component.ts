import { Router } from '@angular/router';
import { Component, OnInit, OnChanges } from '@angular/core';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  mainmenu;

  constructor( private router: Router){

  }

  switchmenu(){
  }
  ngOnInit() { 
    if(this.router.url=='/admin'){
      this.router.navigateByUrl('/admin/dashboard');
    }
  }
}
