import { InventoryServiceService } from './../../services/inventory-service.service';
import { LoginComponent } from './../../login/login.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, NgForm, Validators } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



export interface vendor {
  id: any;
  name: any;
}



@Component({
  selector: 'app-inventory-form',
  templateUrl: './inventory-form.component.html',
  styleUrls: ['./inventory-form.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class InventoryFormComponent implements OnInit {
  userForm: FormGroup;
  vendors: vendor[] = [];

  constructor(
    private fb: FormBuilder,
    private _router : Router,
    private inventoryService: InventoryServiceService,
    private toastr: ToastrService) {
  }

  get brand(){
    return this.userForm.get('brand');
  }
  get model(){
    return this.userForm.get('model');
  }
  get vendor(){
    return this.userForm.get('vendor_id');
  }


  ngOnInit() {

    this.inventoryService.getVendors().subscribe(
      result=>{
        for(let vendor in result['vendor']){
          let person : vendor= {
            id:result['vendor'][vendor]._id,
            name:result['vendor'][vendor].name
          }
          this.vendors.push(person);
        }
      }
    )


    this.userForm = this.fb.group({
      brand: this.fb.control('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(255),
      ]),
      model: this.fb.control('', [
        Validators.required,
        Validators.maxLength(255),
      ]),
      vendor_id: this.fb.control('', [
        Validators.required,
      ]),
      details: this.fb.array([
        this.fb.group({
          color: this.fb.control('', [
            Validators.required,
            Validators.maxLength(255),
          ]),
          IMEI: this.fb.control('', [
            Validators.required,
          ]),
          price: this.fb.control('', [
            Validators.required,
          ]),
        })
      ]),
    });
  }
  
  addPhone(): void {
    (this.userForm.get('details') as FormArray).push(
      this.fb.group({
        color: this.fb.control(null),
        IMEI: this.fb.control(null),
        price: this.fb.control(null)
      })
    );
   
  }

  removePhone(index) {
    (this.userForm.get('details') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('details')).controls;

  }

  send(values) {
    console.log("Value",values);
  }

  submit(form:NgForm){
    this.inventoryService.addInventory(form).subscribe(
      result=>{
        this._router.navigate(['/admin/view-inventory']);
        if(result){
          this.showNotification();
        }
      }
    )
  }

  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Inventory</span>',
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
