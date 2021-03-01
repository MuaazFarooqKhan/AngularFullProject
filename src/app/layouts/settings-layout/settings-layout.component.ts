import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-layout',
  templateUrl: './settings-layout.component.html',
  styleUrls: ['./settings-layout.component.scss']
})
export class SettingsLayoutComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
    if(this.router.url=='/settings'){
      this.router.navigateByUrl('/settings/profile');
    }
  }

}
