import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vendor-form',
  templateUrl: './vendor-form.component.html',
  styleUrls: ['./vendor-form.component.scss']
})
export class VendorFormComponent implements OnInit {

  name:string="";
  address:string="";
  cnic:string="";
  phone:string="";

  

  addvendor = new FormGroup({
    name : new FormControl(null,[Validators.required, Validators.minLength(3)]),
    address : new FormControl(null,[Validators.required, Validators.minLength(5)]),
    cnic : new FormControl(null,[Validators.required,Validators.pattern('[0-9 ]*'), Validators.minLength(13), Validators.maxLength(13)]),
    phone: new FormControl(null,[Validators.required,Validators.pattern('^(03){1}[0-9]{9}'), Validators.minLength(7),Validators.maxLength(11)])
    
  })
  constructor( private _router : Router , private  _use : UserService, private toastr: ToastrService) { }
  ngOnInit() {
  }

  addVendor(addvendor:any){
    this.name=addvendor.controls.name.value;
    this.address=addvendor.controls.address.value;
    this.cnic=addvendor.controls.cnic.value;
    this.phone=addvendor.controls.phone.value;

    console.log("Vendor", addvendor)
    this._use.advendor(this.addvendor.value).subscribe(
      data => {
        this._router.navigate(['/admin/view-vendor']);
        if(data){
          this.showNotification();
        }
      }
    )
  }


  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Vendor</span>',
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