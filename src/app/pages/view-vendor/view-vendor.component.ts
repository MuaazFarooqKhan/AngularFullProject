import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';
import { ModalDismissReasons, NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

interface PeriodicElement {
  position: any;
  name: any;
  cnic: any;
  address: any;
  number: any;
  _id: any;
}

@Component({
  selector: 'app-view-vendor',
  templateUrl: './view-vendor.component.html',
  styleUrls: ['./view-vendor.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class ViewVendorComponent implements OnInit {
  successMessage: string;
  item = {
    name: '',
    cnic: '',
    address: '',
    number: '',
    id: '',
  }


  // edit form
  name: string = "";
  cnic: string = "";
  address: string = "";
  number: string = "";


  // show data

  ELEMENT_DATA: PeriodicElement[] = [];

  modalOptions: NgbModalOptions;
  closeResult: String;

  Mydata: any;
  displayedColumns: string[] = ['position', 'name', 'cnic', 'address', 'number', 'actions'];
  dataSource;

  // delete 
  message: any

  // edit form
  edit = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    cnic: new FormControl('', [Validators.required,Validators.pattern('[0-9 ]*'), Validators.minLength(13), Validators.maxLength(13)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    number: new FormControl('', [Validators.required, Validators.pattern('^(03){1}[0-9]{9}'), Validators.minLength(7),Validators.maxLength(11)])
  })

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
  constructor(
    private _user: UserService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router

  ) {
    // click anywhere to close form
    this.modalOptions = {
      backdrop: true,
      backdropClass: 'customBackdrop'
    }
  }

  ngOnInit() {
    // get data api
    this._user.getuser().subscribe(
      data => {
        this.Mydata = data['vendor']
        console.log(this.Mydata)
        for (let data in this.Mydata) {
          this.ELEMENT_DATA.push({
            position: parseInt(data) + 1,
            name: this.Mydata[data].name,
            cnic: this.Mydata[data].cnic,
            address: this.Mydata[data].address,
            number: this.Mydata[data].phone,
            _id: this.Mydata[data]._id,
          });
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      })
  }


  // show new form for editing
  open(content, value) {
    this._user.getusere(value).subscribe(
      data => {
        this.Mydata = data['vendor']
        this.item.name = this.Mydata.name
        this.item.cnic = this.Mydata.cnic
        this.item.address = this.Mydata.address
        this.item.number = this.Mydata.phone
        this.item.id = this.Mydata._id
      })
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // click anywhere to click the form
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // Edit form
  Edit(edit) {
    let obj = {
      name: edit.get('name').value,
      cnic: edit.get('cnic').value,
      address: edit.get('address').value,
      number: edit.get('number').value
    }
    console.log('edit', obj)
    this._user.editvendor(this.item.id, obj).subscribe(
      data => {
        if (data) {
          this.showNotificationUpdate();
        }      
      },
    )
  }

  delete(elementid: any) {
    console.log("THis is id  " + elementid);
    this._user.deleteVendor(elementid).subscribe(
      data => {
        if (data) {
          this.showNotificationDelete();
        }
      },
    )
  }

  ope(content, value) {
    this._user.getusere(value).subscribe(
      data => {
        this.Mydata = data['vendor']
        this.item.name = this.Mydata.name
        this.item.cnic = this.Mydata.cnic
        this.item.address = this.Mydata.address
        this.item.number = this.Mydata.phone
        this.item.id = this.Mydata._id
      })
    this.modalService.open(content, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }



  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Vendor Successfully Deleted!</span>',
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
      this.router.navigate(['/admin/view-vendor']);
    },
      2000);
  }


  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Vendor Successfully Updated!</span>',
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
