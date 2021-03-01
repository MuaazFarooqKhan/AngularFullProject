import { ToastrService } from 'ngx-toastr';
import { RoleServiceService } from './../../services/role-service.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class RolesComponent implements OnInit {

  submitted: boolean;
  constructor(
    private roleService: RoleServiceService,
    private _router : Router,
    private toastr: ToastrService){

  }

  form = new FormGroup({
    role_name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    Dashboard: new FormControl(false, [
      
    ]),
    Inventory: new FormControl(false, [
      
    ]),
    POS: new FormControl(false, [
      
    ]),
    Broadcast: new FormControl(false, [
      
    ]),
    search_Plaza: new FormControl(false, [
      
    ]),
    Settings: new FormControl(false, [
      
    ])
  });
  get role_name(){
    return this.form.get('role_name')
  }
  get Dashboard(){
    return this.form.get('Dashboard')
  }
  get Inventory(){
    return this.form.get('Inventory')
  }
  get POS(){
    return this.form.get('POS')
  }
  get Broadcast(){
    return this.form.get('Broadcast')
  }
  get search_Plaza(){
    return this.form.get('search_Plaza')
  }
  get Settings(){
    return this.form.get('Settings')
  }

  ngOnInit() {}

  submit(form:NgForm){
    this.roleService.addRole(form).subscribe(
      result=>{
        this._router.navigate(['/settings/view-roles']);
        if(result){
          this.showNotification();
        }
      }
    )
  }

  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Role Successfully Added!</span>',
        "",
        {
          timeOut: 4000,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-top-center"
        }
      );
  }

}
