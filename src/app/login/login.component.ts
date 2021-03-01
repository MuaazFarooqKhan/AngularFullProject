import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  show = true;
  showforgot = false;
  name: string = "";
  email: string = "";
  password: string = "";
  check: boolean = false;
  message: any;
  Message: string = "you are register sucessfull login to countnue";


  // reset data
  Email: string = "";


  // login data

  loginForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    check: new FormControl('', [Validators.required])

  })


  // email data

  EmailForm = new FormGroup({
    Email: new FormControl('', [Validators.required]),
  })
  constructor(
    private _router: Router, 
    private _user: UserService, 
    private toastr: ToastrService
  ) {


  }
  // hide login form and show reset passwords
  onClick(): void {
    this.show = !this.show;
    this.showforgot = !this.showforgot;         //EVENT BINDING
  }

  ngOnInit() {
  }
  // login data
  GetData(loginForm: any) {
    // console.log(this.name);
    // console.log(this.password);
    // console.log(this.check);
    // console.log(this.loginForm.value);


    // login api

   // this._user.login(this.loginForm.value)
//.subscribe(
        (data: any) => {
          // console.log(data);
          // localStorage.setItem('data', data.token.toString());
         // localStorage.setItem('token', data.token.toString());
          this._router.navigate(['/admin/dashboard']);
         // if(data){
           // this.showNotification();
         // }
       // }
     // );
  }

  // // email data
  // EmailData(EmailForm: any) {
  //   console.log(this.EmailForm.value);
  //   this.Email = this.EmailForm.get('Email').value;
  //   console.log(this.Email)
   }


  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Login</span>',
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
