import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { PosservicesService } from 'app/services/posservices.service';
import { NgbModal, ModalDismissReasons, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';


export interface PeriodicElement {
  position: any;
  name: string;
  brand: string;
  model: string;
  price: string;
  _id: any;
}

@Component({
  selector: 'app-view-sales',
  templateUrl: './view-sales.component.html',
  styleUrls: ['./view-sales.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})


export class ViewSalesComponent implements OnInit {

  constructor(
    private sales: PosservicesService,
    private modalService: NgbModal,
  ) { }

  animal: string;
  name: string;
  Mydata: any;
  modalOptions: NgbModalOptions;
  closeResult: string;

  del: any;
  dataSource;

  ELEMENT_DATA: PeriodicElement[] = [];

  detailsData = {
    cust_name: "",
    cust_cnic: "",
    cust_number: "",
    cust_address: "",
    cust_price: "",
    brand: "",
    model: "",
    color: "",
    IMEI: "",
    price: "",
  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', "price", "bid"];

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  ngOnInit() {
    this.sales.getsales().subscribe(
      data => {
        this.Mydata = data['pos']
        for (let data in this.Mydata) {
          let det = this.Mydata[data].details
          for (let del in det) {
            this.ELEMENT_DATA.push({
              position: parseInt(data) + 1,
              name: this.Mydata[data].cust_name,
              brand: det[del].brand,
              model: det[del].model,
              price: det[del].price,
              _id: this.Mydata[data]._id,
            });
          }
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      })
  }


  open(modal, id) {
    this.sales.getSale(id).subscribe(
      result => {
        this.populateDetails(result);
      }
    )
    this.modalService.open(modal, { centered: true, windowClass: "customModal" }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.emptyDetailsFields();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  populateDetails(result) {
    for (let data in result['pos']) {
      this.detailsData = {
        cust_name: result['pos'][data].cust_name,
        cust_cnic: result['pos'][data].cust_cnic,
        cust_number: result['pos'][data].cust_number,
        cust_address: result['pos'][data].cust_address,
        cust_price: result['pos'][data].cust_price,
        brand: result['pos'][data].details[0].brand,
        model: result['pos'][data].details[0].model,
        color: result['pos'][data].details[0].color,
        IMEI: result['pos'][data].details[0].IMEI,
        price: result['pos'][data].details[0].price
      }
      console.log(this.detailsData);
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.emptyDetailsFields();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.emptyDetailsFields();
      return 'by clicking on a backdrop';
    } else {
      this.emptyDetailsFields();
      return `with: ${reason}`;
    }
  }

  emptyDetailsFields() {
    this.detailsData = {
      cust_name: "",
      cust_cnic: "",
      cust_number: "",
      cust_address: "",
      cust_price: "",
      brand: "",
      model: "",
      color: "",
      IMEI: "",
      price: "",
    }
  }
}

