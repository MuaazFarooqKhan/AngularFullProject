import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { trigger, transition, style, animate } from '@angular/animations';
import { Report } from '../../services/report.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html',
    animations: [
      trigger('open', [
        transition('void => *', [
          style({ opacity: 0 }),
          animate(1000, style({ opacity: 1 }))
        ]),
      ]),
    ],
})

export class DashboardComponent implements OnInit{

  employee_count:any;
  vendor_count:any;
  inventory_count:any;
  total_sales:any;

  Data:any;
  chart:any;

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
sale : any;
date: any;

  constructor(
    private _user: Report,
    private modalService: NgbModal,
    private router: Router

  ) {  }

    ngOnInit(){



      this._user.getreport().subscribe(
        data => {
          console.log("Data",data)
          this.Data = data
          // console.log("this data", this.Data.toto_sales)
          this.employee_count = this.Data.employee_count
          this.vendor_count = this.Data.vendor_count
          this.inventory_count = this.Data.inventory_count
          this.total_sales = this.Data.toto_sales

          this.date = data['pos'].map(data => data.createdAt)
          this.sale = data['pos'].map(data => data.cust_price)

          let dates = []
          this.date.forEach((data)=>{
            let jsdate = new Date(data)
            dates.push(jsdate.toLocaleDateString('en',{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }))
          }
        )

          console.log('sale', this.sale)
          // for(let dat in this.chart)
          // {
          //   let sales = this.chart[dat].cust_price
          //   console.log("Salessssss", sales)
          //   let dates = this.chart[dat].createdAt
          //   console.log("Datesssssss", dates)

          // }
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: dates,
          datasets: [{
              data: this.sale,
              borderColor: '#3cba9f',
              fill:false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },

          scales: {
            yAxes: [{
              ticks: {
                fontColor: "#9f9f9f",
                beginAtZero: false,
                maxTicksLimit: 6,
                //padding: 20
              },
              display: true

            }],

            xAxes: [{
              display:true
            }]
          },
        }
      });

        })
      

      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: [1, 2, 3],
          datasets: [{
            label: "Emails",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#e3e3e3',
              '#4acccd',
              '#fcc468',
              '#ef8157'
            ],
            borderWidth: 0,
            data: [342, 480, 530, 120]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: [0, 19, 15, 20, 30, 40, 40, 50, 25, 30, 50, 70],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      var dataSecond = {
        data: [0, 5, 10, 12, 20, 27, 30, 34, 42, 45, 55, 63],
        fill: false,
        borderColor: '#51CACF',
        backgroundColor: 'transparent',
        pointBorderColor: '#51CACF',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8
      };

      var speedData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [dataFirst, dataSecond]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }
}
