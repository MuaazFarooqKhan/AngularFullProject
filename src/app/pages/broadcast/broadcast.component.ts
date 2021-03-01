import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: string;
  symbol: string;
  price: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Ali Hassan', weight: "Samsung", symbol: 'A70', price: "Rs.45000" },
  { position: 2, name: 'Jon Snow', weight: "Apple", symbol: 'iPhone XS Max', price: "Rs.125000" },
  { position: 3, name: 'Frank Underwood', weight: "Xiaomi", symbol: 'Note 8 Pro', price: "Rs.43000" },
  { position: 4, name: 'Professor', weight: "Huawei", symbol: 'P30 Lite', price: "Rs.90000" },
  { position: 5, name: 'Berlin', weight: "Vivo", symbol: 'V17 Pro', price: "Rs. 560000" },
  { position: 6, name: 'Dr. Sheldon', weight: "Oppo", symbol: 'A2 Reno', price: "Rs. 65000" },
  { position: 7, name: 'Barney Stinson', weight: "One Plus", symbol: '7 Pro', price: "Rs 125000" },
  { position: 8, name: 'Ted Mosby', weight: "ROG", symbol: 'ASUS 2', price: "Rs. 124000" },
  { position: 9, name: 'Thommas Shelby', weight: "Google", symbol: 'Pixel 4', price: "Rs. 88000" },
  { position: 10, name: 'Lucifer Morningstar', weight: "Leneovo", symbol: 'K7', price: "Rs. 41000" },
];

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class BroadcastComponent implements OnInit {
  animal: string;
  name: string;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', "price", "bid"];
  dataSource = ELEMENT_DATA;
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '50%',
      data: { name: this.name, animal: this.animal }

    });

  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}