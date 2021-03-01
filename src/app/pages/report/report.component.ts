import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { trigger, transition, style, animate } from '@angular/animations';
import { Report } from '../../services/report.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


interface PeriodicElement {
  position:any;
  date: any;
  sales: any;
  cust_name:any;
}


@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  Data: any;

  ELEMENT_DATA: PeriodicElement[] = [
    // {date: 1, sales: 'Salim J'},
    // {date: 2, sales: 'Ali'},
    // {date: 3, sales: 'Ahmed'},
    // {date: 4, sales: 'Haroon'},
  ];

  displayedColumns: string[] = ['position','date','cust_name', 'sales'];
  dataSource;
  // dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _user: Report,
    private modalService: NgbModal,
  ) { }



  ngOnInit() {


    this._user.getreport().subscribe(
      data => {
        console.log("Data",data)
        this.Data = data['pos']

        console.log("this is array", this.Data)
        for(let dat in this.Data)
        {
          this.ELEMENT_DATA.push({
            position: parseInt(dat) + 1,
            date : this.Data[dat].createdAt,
            sales : this.Data[dat].cust_price,
            cust_name : this.Data[dat].cust_name,

          })
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
        }
      })


  }
 
}
