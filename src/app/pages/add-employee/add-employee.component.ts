import { EmployeeServiceService } from './../../services/employee-service.service';
import { RoleServiceService } from './../../services/role-service.service';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators, FormArray, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


export interface Roles {
  id: any,
  name: any
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class AddEmployeeComponent implements OnInit {

  roles: Roles[] = [];
  constructor(
    private roleService: RoleServiceService,
    private employeeService: EmployeeServiceService,
    private _router : Router,
    private toastr: ToastrService
  ) { }


  form = new FormGroup({
    employee_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    employee_email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    employee_password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    employee_cnic: new FormControl('', [
      Validators.required,
      Validators.minLength(13),
      Validators.maxLength(13),

    ]),
    employee_phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(03){1}[0-9]{9}'),

    ]),
    Roles: new FormControl('', [
      Validators.required,
    ]),
  });

  get name() {
    return this.form.get('employee_name');
  }
  get email() {
    return this.form.get('employee_email');
  }
  get password() {
    return this.form.get('employee_password');
  }
  get cnic() {
    return this.form.get('employee_cnic');
  }
  get phone() {
    return this.form.get('employee_phone');
  }
  get Roles() {
    return this.form.get('Roles');
  }

  populateRoles(){
    this.roleService.getRoles().subscribe(
      result=>{
        console.log(result);
        for(let record in result['roles']){
          let role : Roles = {
            id: result['roles'][record]._id,
            name: result['roles'][record].role_name
          }
          this.roles.push(role);
        }
      }
    )
  }

  ngOnInit() {
    this.populateRoles();
  }

  add(data:NgForm) {
    this.employeeService.addEmployee(data).subscribe(
      result=>{
        this._router.navigate(['/settings/view-employee']);
        if(result){
          this.showNotification();
        } 
        // if (result){
        //   console.log(result);
        // }
      }
    )
  }

  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Employee</span>',
        "",
        {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: "toast-top-center"
        }
      );
  }

}
