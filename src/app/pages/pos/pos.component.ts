import { SalesServiceService } from './../../services/sales-service.service';
import { InventoryServiceService } from './../../services/inventory-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl, Validators, NgForm } from '@angular/forms';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface Brand {
  brand: any;
  model: [{
    name: any
    phone: [{
      color: any;
      IMEI: any;
      price: any;
    }]
  }
  ];

}


@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class PosComponent implements OnInit {
  brands: Brand[] = []
  userForm: FormGroup;
  selectedbrand="";
  selectedmodel;


  constructor(
    private fb: FormBuilder,
    private inventoryService: InventoryServiceService,
    private salesService: SalesServiceService,
    private _router : Router,
    private toastr: ToastrService
  ) {
  }
  ngOnInit() {
    this.userForm = this.fb.group({
      details: this.fb.array([
        this.fb.group({
          brand: this.fb.control('talal', [
            Validators.required,
          ]),
          model: this.fb.control('', [
            Validators.required,
          ]),
          color: this.fb.control('', [
            Validators.required,
          ]),
          IMEI: this.fb.control('', [
            Validators.required,
          ]),
          price: this.fb.control('', [
            Validators.required,
          ]),
        })
      ]),
      cust_name: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      cust_cnic: this.fb.control('', [
        Validators.required,
        Validators.minLength(13),
        Validators.maxLength(13),
        Validators.pattern("^[0-9]*$")
      ]),
      cust_number: this.fb.control('', [
        Validators.required,
        Validators.pattern("^[0-9]*$")
      ]),
      cust_address: this.fb.control('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ]),
      cust_price: this.fb.control('', [
        Validators.pattern("^[0-9]*$")
      ])
    });

    this.populateBrands();

  }

  get details() {
    return this.userForm.get('details');
  }
  get brand() {
    return this.details.get('brand');
  }
  get model() {
    return this.details.get('model')
  }
  get color() {
    return this.details.get('color')
  }
  get IMEI() {
    return this.details.get('IMEI')
  }
  get price() {
    return this.details.get('price')
  }
  get cust_name() {
    return this.userForm.get('cust_name')
  }
  get cust_cnic() {
    return this.userForm.get('cust_cnic')
  }
  get cust_address() {
    return this.userForm.get('cust_address')
  }
  get cust_number() {
    return this.userForm.get('cust_number')
  }
  get cust_price() {
    return this.userForm.get('cust_price')
  }

  populateBrands() {
    this.inventoryService.getInventories().subscribe(
      result => {
        for (let data in result['inventory_data']) {
          let brandexists = false;
          let modelexists = false;
          for (let brand in this.brands) {
            if (this.brands[brand].brand === result['inventory_data'][data]['brand']) {
              brandexists = true;
            }
            for (let model in this.brands[brand]['model']) {
              if (this.brands[brand]['model'][model].name === result['inventory_data'][data]['model']) {
                modelexists = true;
              }
            }
          }
          if (brandexists && modelexists) {
            for (let brand in this.brands) {
              if (this.brands[brand].brand === result['inventory_data'][data]['brand']) {
                let phone;
                for (let model in this.brands[brand]['model']) {
                  if (this.brands[brand]['model'][model].name === result['inventory_data'][data]['model']) {
                    phone = {
                      color: result['inventory_data'][data]['invent']['color'],
                      IMEI: result['inventory_data'][data]['invent']['IMEI'],
                      price: result['inventory_data'][data]['invent']['price']
                    }
                    this.brands[brand]['model'][model]['phone'].push(phone)
                  }
                }
              }
            }
          }
          else if (brandexists && !modelexists) {
            for (let brand in this.brands) {
              if (this.brands[brand].brand === result['inventory_data'][data]['brand']) {
                this.brands[brand].model.push({
                  name: result['inventory_data'][data]['model'],
                  phone: [{
                    color: result['inventory_data'][data]['invent']['color'],
                    IMEI: result['inventory_data'][data]['invent']['IMEI'],
                    price: result['inventory_data'][data]['invent']['price']
                  }]
                })
              }
            }
          }
          else {
            this.brands.push({
              brand: result['inventory_data'][data]['brand'],
              model: [{
                name: result['inventory_data'][data]['model'],
                phone: [{
                  color: result['inventory_data'][data]['invent']['color'],
                  IMEI: result['inventory_data'][data]['invent']['IMEI'],
                  price: result['inventory_data'][data]['invent']['price'],
                }]
              }]
            })
          }
        }
      }
    )
  }

  setBrand(value){
    this.selectedbrand=value.target.value;
  }

  setModel(value){
    this.selectedmodel=value.target.value
  }

  addMobile(): void {
    (this.userForm.get('details') as FormArray).push(
      this.fb.group({
        brand: this.fb.control(null),
        model: this.fb.control(null),
        color: this.fb.control(null),
        IMEI: this.fb.control(null),
        price: this.fb.control(null)
      })
    );
  }


  removeMobile(index) {
    (this.userForm.get('details') as FormArray).removeAt(index);
  }

  getMobileFormControls(): AbstractControl[] {
    return (<FormArray>this.userForm.get('details')).controls
  }

  submit(data: NgForm) {
    console.log(data);
    this.salesService.addSale(data).subscribe(
      result=>{
        this._router.navigate(['/admin/view-sales']);
        if(result){
          this.showNotification();
        }      
      }
    )
  }

  showNotification(){
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Successfully Added Sales</span>',
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