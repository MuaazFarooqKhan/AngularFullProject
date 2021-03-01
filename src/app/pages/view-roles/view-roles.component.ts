import { Router } from '@angular/router';
import { RoleServiceService } from './../../services/role-service.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';
import { NgbModalOptions, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


export interface PeriodicElement {
  position: number;
  name: any;
  permissions: any;
  user: any;
}

export interface Role {
  name: string;
  dashboard: boolean;
  inventory: boolean;
  pos: boolean;
  broadcast: boolean;
  search_plaza: boolean;
  settings: boolean;
  id: number;
}

@Component({
  selector: 'app-view-roles',
  templateUrl: './view-roles.component.html',
  styleUrls: ['./view-roles.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})


export class ViewRolesComponent implements OnInit {

  modalOptions: NgbModalOptions;
  closeResult: string;

  constructor(
    private roleService: RoleServiceService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.modalOptions = {
      backdrop: 'static',
      backdropClass: 'customBackdrop',
      size: 'xl',
      centered: true
      // windowClass: 'customModal'
    }
  }

  data: any;
  users: any[] = [];
  displayedColumns: string[] = ['position', 'name', 'permissions', 'actions'];
  ELEMENT_DATA: PeriodicElement[] = [];
  dataSource;

  modalData: Role = {
    name: "",
    dashboard: false,
    inventory: false,
    pos: false,
    broadcast: false,
    search_plaza: false,
    settings: false,
    id: null
  }

  form = new FormGroup({
    role_name: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    Dashboard: new FormControl(false, [

    ]),
    Inventory: new FormControl(false, [

    ]),
    POS: new FormControl(false, [

    ]),
    Broadcast: new FormControl(false, [

    ]),
    search_Plaza: new FormControl(false, [

    ]),
    Settings: new FormControl(false, [

    ])
  });
  get role_name() {
    return this.form.get('role_name')
  }
  get Dashboard() {
    return this.form.get('Dashboard')
  }
  get Inventory() {
    return this.form.get('Inventory')
  }
  get POS() {
    return this.form.get('POS')
  }
  get Broadcast() {
    return this.form.get('Broadcast')
  }
  get search_Plaza() {
    return this.form.get('search_Plaza')
  }
  get Settings() {
    return this.form.get('Settings')
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.populateTable();
  }

  populateTable() {
    this.roleService.getRoles().subscribe(
      result => {
        this.data = result['roles'];
        let pos: number = 0;
        let name: any;
        for (let data in result['roles']) {
          let permissions: string = "";
          let keycounter: number = 0
          for (let key in result['roles'][data]) {
            if (keycounter < 6) {
              if (result['roles'][data][key]) {
                permissions = permissions + key + ", ";

              }
            }
            keycounter++;
          }
          permissions = permissions.slice(0, permissions.length - 2);
          name = result['roles'][data].role_name;
          pos = pos + 1;
          this.users.push();
          let role: PeriodicElement = {
            position: pos,
            name: name,
            permissions: permissions,
            user: result['roles'][data]._id
          }
          this.ELEMENT_DATA.push(role);
        }
        this.dataSource = new MatTableDataSource(this.ELEMENT_DATA);
      }
    );
  }

  deleteRole(id) {
    this.roleService.deleteRole(id).subscribe(
      result => {
        if (result) {
          this.showNotificationDelete();
        }
      }
    )
  }

  update(form: NgForm) {
    let id = this.modalData.id
    this.roleService.patchRole(form, id).subscribe(
      result => {
        if (result) {
          this.emptyModalFields();
          this.role_name.markAsUntouched;
          this.showNotificationUpdate();
        }
      }
    )
  }

  openModal(modal, id) {
    this.modalData.id = id
    this.roleService.getRole(id).subscribe(
      result => {
        this.populateModal(result);
      }
    )

    this.modalService.open(modal, this.modalOptions).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      // this.emptyModalFields();
    });
  }

  populateModal(result) {
    this.modalData.name = result['roles'][0].role_name;
    this.modalData.dashboard = result['roles'][0].Dashboard;
    this.modalData.inventory = result['roles'][0].Inventory;
    this.modalData.pos = result['roles'][0].POS;
    this.modalData.broadcast = result['roles'][0].Broadcast;
    this.modalData.search_plaza = result['roles'][0].search_Plaza;
    this.modalData.settings = result['roles'][0].Settings;
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


  emptyModalFields() {
    this.modalData = {
      name: "",
      dashboard: false,
      inventory: false,
      pos: false,
      broadcast: false,
      search_plaza: false,
      settings: false,
      id: null
    }
  }

  showNotificationUpdate() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Role Successfully Updated!</span>',
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

  showNotificationDelete() {
    this.toastr.info(
      '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">Role Successfully Deleted!</span>',
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
      this.router.navigate(['/settings/view-roles']);
    },
      2000);
  }






}
