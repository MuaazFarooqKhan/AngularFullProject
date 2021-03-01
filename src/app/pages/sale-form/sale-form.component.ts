import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-sale-form',
  templateUrl: './sale-form.component.html',
  styleUrls: ['./sale-form.component.scss']
})
export class SaleFormComponent implements OnInit {
  userForm: FormGroup;
  constructor(private fb: FormBuilder) { 
    this.userForm = this.fb.group({
      name: [],
      phones: this.fb.array([
        this.fb.control(null)
      ]),
      imei: this.fb.array([
        this.fb.control(null)
      ]),
      price: this.fb.array([
        this.fb.control(null)
      ])
    
    })
  }

  ngOnInit() {
  }

  addPhone(): void {
    (this.userForm.get('phones') as FormArray).push(
      this.fb.control(null)
    );
    (this.userForm.get('imei') as FormArray).push(
      this.fb.control(null)
    );
    (this.userForm.get('price') as FormArray).push(
      this.fb.control(null)
    );
  }

  removePhone(index) {
    (this.userForm.get('phones') as FormArray).removeAt(index);
    (this.userForm.get('imei') as FormArray).removeAt(index);
    (this.userForm.get('price') as FormArray).removeAt(index);
  }

  getPhonesFormControls(): AbstractControl[] {
    return (<FormArray> this.userForm.get('phones')).controls
  }

  send(values) {
    console.log(values);
  }

}
4
