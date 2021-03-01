

import { InventoryServiceService } from './../../services/inventory-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';



export interface PeriodicElement {
  inventory_id: any;
  position: number;
  color: string;
  IMEI: string;
  price: string;
  model: any;
  brand: any;
  vendor_id: any;
  vendor_name: any;
}

export interface Vendor {
  id: any;
  name: any;
}

export interface Inventory {
  id: any;
  model: any;
  color: any;
  IMEI: any;
  price: any;
  visible: boolean;
  description: any;
}


@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.scss']
})


export class InventoryViewComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;

  constructor(
    public dialog: MatDialog,
    private inventoryService: InventoryServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'lg',
      centered: true
      // windowClass: 'customModal'
    }
  }


  displayedColumns: string[] = ['position', 'shopname', 'model', 'mobilename', 'color', 'price', 'actions'];
  dataSource;
  vendors: Vendor[] = [];
  ELEMENT_DATA: PeriodicElement[] = [];

  modalData: Inventory = {
    id: "",
    model: "",
    color: "",
    IMEI: "",
    price: "",
    visible: null,
    description: ""
  }

  detailsData: Inventory = {
    id: "",
    model: "",
    color: "",
    IMEI: "",
    price: "",
    visible: null,
    description: ""
  }

  ngOnInit() {
    this.inventoryService.getVendors().subscribe(
      result => {
        for (let record in result['vendor']) {
          let vendor: Vendor = {
            id: result['vendor'][record]['_id'],
            name: result['vendor'][record]['name']
          }
          this.vendors.push(vendor)
        }
      }
    )
    this.populateTable();
  }

  form = new FormGroup({
    color: new FormControl('', [
      Validators.required,
      Validators.maxLength(255),
    ]),
    IMEI: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    visible: new FormControl(null ,[
      Validators.required
    ]),
    description: new FormControl('', [])

  })

  get color() {
    return this.form.get('color');
  }
  get IMEI() {
    return this.form.get('IMEI');
  }
  get price() {
    return this.form.get('price');
  }
  get visible() {
    return this.form.get('visible')
  }
  get description(){
    return this.form.get('description')
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  populateTable() {
    this.inventoryService.getInventories().subscribe(
      result => {
        let position: number = 1;
        for (let data in result['inventory_data']) {
          var vendorname = "";
          for (let vendor of this.vendors) {
            if (vendor.id == result['inventory_data'][data]['vendor_id']) {
              vendorname = vendor.name
            }
          }
          let inventory: PeriodicElement = {
            inventory_id: result['inventory_data'][data]['invent']['_id'],
            position: position,
            color: result['inventory_data'][data]['invent']['color'],
            IMEI: result['inventory_data'][data]['invent']['IMEI'],
            price: result['inventory_data'][data]['invent']['price'],
            model: result['inventory_data'][data]['model'],
            brand: result['inventory_data'][data]['brand'],
            vendor_id: result['inventory_data'][data]['vendor_id'],
            vendor_name: vendorname
          }
          this.ELEMENT_DATA.push(inventory);
          position++;
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    )
  }

  openModal(modal, id) {
    this.inventoryService.getInventory(id).subscribe(
      result=>{
        this.populateModal(result)
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.emptyModalFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });


  }

  openDetails(modal,id){
    this.inventoryService.getInventory(id).subscribe(
      result=>{
        this.populateDetails(result)
      }
    )
    this.modalService.open(modal, {centered:true, windowClass:"customModal"}).result.then((result) => {
      this.emptyDetailsFields();    
      this.closeResult = `Closed with: ${result}`;
      
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  populateModal(data){
    this.modalData.id = data._id
    this.modalData.IMEI=data.IMEI;
    this.modalData.color=data.color;
    this.modalData.price= data.price;
    this.modalData.visible=data.visible;
    this.modalData.description=data.description;
  }

  populateDetails(data){
    this.detailsData.id = data._id
    this.detailsData.IMEI=data.IMEI;
    this.detailsData.color=data.color;
    this.detailsData.price= data.price;
    this.detailsData.visible=data.visible;
    this.detailsData.description=data.description;
  }

  deleteInventory(id) {
    this.inventoryService.deleteInventory(id).subscribe(
      result => {
        if (result) {
          this.showNotificationDelete();
        }        
      }
    )
  }

  editInventory(data: NgForm) {
    this.inventoryService.patchInventory(data, data['IMEI']).subscribe(
      result=>{
        if (result) {
          this.showNotificationUpdate();
        }   
      }
    )
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.emptyModalFields();
      this.emptyDetailsFields();
      return 'by clicking on a backdrop';
    } else {
      "closing"
      return `with: ${reason}`;
    }
  }

  emptyModalFields(){
    this.modalData.IMEI="";
    this.modalData.color="";
    this.modalData.description="";
    this.modalData.id="";
    this.modalData.model="";
    this.modalData.price="";
    this.modalData.visible=null;
  }

  emptyDetailsFields(){
    this.detailsData.IMEI="";
    this.detailsData.color="";
    this.detailsData.description="";
    this.detailsData.id="";
    this.detailsData.model="";
    this.detailsData.price="";
    this.detailsData.visible=null;
  }


  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Inventory Successfully Deleted!</span>',
      "",
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
    setTimeout(() => {
      this.router.navigate(['/admin/view-inventory']);
    },
      2000);
  }


  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Inventory Successfully Updated!</span>',
      "",
      {
        timeOut: 1000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
  }

}
