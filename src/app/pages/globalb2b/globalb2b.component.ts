

import { InventoryServiceService } from './../../services/inventory-service.service';
import { MatTableModule } from '@angular/material/table';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

export interface PeriodicElement {
  position: any;
  id: any;
  shop_name: any;
  model: any;
  brand_name: any;
  price: any;
  color: any;
  IMEI: any;
  description: any;
  shop_address: any;
}

// const ELEMENT_DATA: PeriodicElement[] = [
//   { position: 1, name: 'A Tech', weight: "Samsung", symbol: 'A70', price: "Rs.45000" },
//   { position: 2, name: 'Friends Mobiles', weight: "Apple", symbol: 'iPhone XS Max', price: "Rs.125000" },
//   { position: 3, name: 'Eplison Techmart', weight: "Xiaomi", symbol: 'Note 8 Pro', price: "Rs.43000" },
//   { position: 4, name: 'HP Mobiles', weight: "Huawei", symbol: 'P30 Lite', price: "Rs.90000" },
//   { position: 5, name: 'Newsoft Mobiles', weight: "Vivo", symbol: 'V17 Pro', price: "Rs. 560000" },
//   { position: 6, name: 'Oppo Store', weight: "Oppo", symbol: 'A2 Reno', price: "Rs. 65000" },
//   { position: 7, name: 'K Telecommunications', weight: "One Plus", symbol: '7 Pro', price: "Rs 125000" },
//   { position: 8, name: 'Wset Mobiles', weight: "ROG", symbol: 'ASUS 2', price: "Rs. 124000" },
//   { position: 9, name: 'TS Tech', weight: "Google", symbol: 'Pixel 4', price: "Rs. 88000" },
//   { position: 10, name: 'Only Com Mobiles', weight: "Leneovo", symbol: 'K7', price: "Rs. 41000" },
// ];


@Component({
  selector: 'app-globalb2b',
  templateUrl: './globalb2b.component.html',
  styleUrls: ['./globalb2b.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class Globalb2bComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  displayedColumns: string[] = ['position', 'shop_name', 'model', 'brand_name', 'color', 'price', 'actions'];
  dataSource;
  closeResult: string;

  detailsData: PeriodicElement = {
    position: "",
    id: "",
    shop_name: "",
    model: "",
    brand_name: "",
    price: "",
    color: "",
    IMEI: "",
    description: "",
    shop_address: "",
  };

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(
    private inventoryService: InventoryServiceService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.inventoryService.getPlazaItems().subscribe(
      result => {
        console.log(result);
        this.populateTable(result);
      }
    )
  }

  populateTable(result) {
    let position = 1;
    for (let index in result['sales']) {
      let sale: PeriodicElement = {
        position: position,
        id: null,
        shop_name: result['sales'][index].name,
        shop_address: result['sales'][index].address,
        brand_name: result['sales'][index].brand,
        model: result['sales'][index].model,
        color: result['sales'][index].sale.color,
        IMEI: result['sales'][index].sale.IMEI,
        price: result['sales'][index].sale.price,
        description: result['sales'][index].sale.description,
      }
      this.ELEMENT_DATA.push(sale)
      position++;
    }
    this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  }

  openDetails(modal, id) {
    this.inventoryService.getPlazaItem(id).subscribe(
      result => {
        this.populateDetails(result)
      }
    )

    this.modalService.open(modal, { centered: true, windowClass: "customModal" }).result.then((result) => {
      this.emptyDetailsFields();
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  populateDetails(result) {
    for (let index in result['sales']) {
      this.detailsData.shop_name = result['sales'][index].name;
      this.detailsData.shop_address = result['sales'][index].address;
      this.detailsData.brand_name = result['sales'][index].brand;
      this.detailsData.model = result['sales'][index].model;
      this.detailsData.color = result['sales'][index].sale.color;
      this.detailsData.IMEI = result['sales'][index].sale.IMEI;
      this.detailsData.price = result['sales'][index].sale.price;
      this.detailsData.description = result['sales'][index].sale.description;
    }
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.emptyDetailsFields();
      return 'by clicking on a backdrop';
    } else {
      "closing"
      return `with: ${reason}`;
    }
  }

  emptyDetailsFields() {
    this.detailsData = {
      position: "",
      id: "",
      shop_name: "",
      model: "",
      brand_name: "",
      price: "",
      color: "",
      IMEI: "",
      description: "",
      shop_address: "",
    };
  }
}
