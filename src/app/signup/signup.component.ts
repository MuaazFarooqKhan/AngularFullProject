import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  name:string="";
  email:string="";
  address:string=""; 
  password:string="";
  phone:string="";

  signupForm = new FormGroup({
    name : new FormControl('',[Validators.required, Validators.minLength(3)]),
    email : new FormControl('',[Validators.required, Validators.email]),
    address : new FormControl('',[Validators.required, Validators.minLength(5)]),
    phone : new FormControl('',[Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    password : new FormControl('',[Validators.required, Validators.minLength(5)])

  })
  constructor(private _router : Router , private  _userService : UserService, private toastr: ToastrService) { 
    

  } 

  ngOnInit() {
  }
  PostData(signupForm:any){
    console.log(this.email);
    console.log(this.name);
    console.log(this.signupForm.value);

   this._userService.register(this.signupForm.value).subscribe(
        data => {
          this._router.navigate(['/']);
          if(data){
            this.showNotification();
          }
        }
      )
  }
  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Registered Successfully!</span>',
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
