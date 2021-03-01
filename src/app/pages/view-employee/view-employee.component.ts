import { AddEmployeeComponent } from 'app/pages/add-employee/add-employee.component';
import { RoleServiceService } from './../../services/role-service.service';
import { EmployeeServiceService } from './../../services/employee-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';
import { Roles } from '../add-employee/add-employee.component';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbModalOptions, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

export interface PeriodicElement {
  position: number;
  name: string;
  cnic: number;
  email: string;
  phone: any;
  role_id: string;
  user_id: any;
  role_name: any;
}

export interface Employee {
  id: any;
  name: any;
  cnic: any;
  phone: any;
  email: any;
  role: any;
}



@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class ViewEmployeeComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;

  constructor(
    private employeeService: EmployeeServiceService,
    private roleService: RoleServiceService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public dialog: MatDialog,
  ) { 
      this.modalOptions = {
        backdrop: 'static',
        backdropClass: 'customBackdrop',
        size: 'xl',
        centered: true
        // windowClass: 'customModal'
      }
   }

  ELEMENT_DATA: PeriodicElement[] = [];
  roles : Roles[] = [];
  displayedColumns: string[] = ['position', 'name', 'cnic', 'email', 'phone', 'role_name', 'actions'];
  dataSource;
  modalData: Employee = {
    id: "",
    name: "",
    cnic: "",
    phone: "",
    email: "",
    role: ""
  }

  detailsData: Employee = {
    id: "",
    name: "",
    cnic: "",
    phone: "",
    email: "",
    role: ""
  }


  form = new FormGroup({
    employee_name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    employee_email: new FormControl('', [
      Validators.required,
      Validators.email
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
  get cnic() {
    return this.form.get('employee_cnic');
  }
  get phone() {
    return this.form.get('employee_phone');
  }
  get Roles() {
    return this.form.get('Roles');
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.roleService.getRoles().subscribe(
      result=>{
        for(let record in result['roles']){
          let role : Roles = {
            id: result['roles'][record]._id,
            name: result['roles'][record].role_name
          }
          this.roles.push(role);
        }
      }
    )
    this.populateTable();
  } 


  populateTable(){
    this.employeeService.getEmployees().subscribe(
      result=>{
        let position: number = 1;
        for(let data in result['employees']){
          var rolename = "";
          for(let role of this.roles){
            if(role.id==result['employees'][data].Roles){
              rolename=role.name;
            }
          }
          let employee: PeriodicElement = {
            position: position,
            name: result['employees'][data].employee_name,
            cnic: result['employees'][data].employee_cnic,
            email: result['employees'][data].employee_email ,
            phone: 0+""+result['employees'][data].employee_phone,
            role_id: result['employees'][data].Roles,
            user_id: result['employees'][data]._id,
            role_name: rolename
          }
          this.ELEMENT_DATA.push(employee);
          position++;
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    )
  }

  deleteEmp(id){
    this.employeeService.deleteEmployee(id).subscribe(
      result=>{
        if(result){
          this.showNotificationDelete();
        }
      }
    )
  }

  openEdit(modal, id) {
    this.modalData.id = id
    this.employeeService.getEmployee(id).subscribe(
      result=>{
        this.populateModal(result);
      }
    )
    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.emptyModalFields();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  editEmployee(form:NgForm){
    this.employeeService.patchEmployee(form,this.modalData.id).subscribe(
      result=>{
        if(result){
          this.showNotificationUpdate();
        }
      }
    )
  }

  openDetails(modal,id){
    this.employeeService.getEmployee(id).subscribe(
      result=>{
        this.populateDetails(result)
      }
    )
    this.modalService.open(modal, {centered:true, windowClass:"customModal"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.emptyDetailsFields();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  populateDetails(data){
    this.detailsData.name=data['employees'].employee_name;
    this.detailsData.cnic=data['employees'].employee_cnic;
    this.detailsData.phone=data['employees'].employee_phone;
    this.detailsData.email=data['employees'].employee_email;
    for(let role of this.roles){
      if(role.id==data['employees'].Roles){
        this.detailsData.role=role.name;
      }
    }
  }

  populateModal(data){
    this.modalData.name=data['employees'].employee_name;
    this.modalData.cnic=data['employees'].employee_cnic;
    this.modalData.phone=data['employees'].employee_phone;
    this.modalData.email=data['employees'].employee_email;
    this.modalData.role=data['employees'].Roles;
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      this.emptyModalFields();
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      this.emptyModalFields();
      return 'by clicking on a backdrop';
    } else {
      this.emptyModalFields();
      return `with: ${reason}`;
    }
  }

  emptyModalFields(){
    console.log("emptying")
    this.modalData = {
      id: "",
      name: "",
      cnic: "",
      phone: "",
      email: "",
      role: ""
    }
  }

  emptyDetailsFields(){
    this.detailsData = {
      id: "",
      name: "",
      cnic: "",
      phone: "",
      email: "",
      role: ""
    }
  }

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Employee Successfully Deleted!</span>',
      "",
      {
        timeOut: 2000,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-success alert-with-icon",
        positionClass: "toast-top-center"
      }
    );
    // setTimeout(() => {
    //   this.router.navigate(['/settings/view-roles']);
    // },
    //   2000);
  }

  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Employee Successfully Updated!</span>',
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
