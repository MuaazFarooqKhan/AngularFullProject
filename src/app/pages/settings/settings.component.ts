import { ProfileServiceService } from './../../services/profile-service.service';
import { EmployeeServiceService } from './../../services/employee-service.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';



export interface Profile {
  id: any;
  name: any;
  email: any;
  address: any;
  phone: any;
  filename: any;
  tagline: any;
}


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('open', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate(1000, style({ opacity: 1 }))
      ]),
    ]),
  ],
})
export class SettingsComponent implements OnInit {


  profile: Profile = {
    id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    filename: "",
    tagline: "",
  }


  constructor(
    private profileService: ProfileServiceService
  ) { }


  form = new FormGroup({
    name : new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern('[a-zA-Z ]*')
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(255),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(03){1}[0-9]{9}'),
    ]),
    filename: new FormControl('', [
    ]),
    tagline: new FormControl('', [
    ])
  }
  );

  get name(){
    return this.form.get('name');
  }
  get email(){
    return this.form.get('email');
  }
  get address(){ 
    return this.form.get('address');
  }
  get phone(){
    return this.form.get('phone');
  }


  ngOnInit() {
    this.populateForm();
  }

  populateForm() {
    this.profileService.getProfile().subscribe(
      result => {
        this.profile.id = result['user']._id;
        this.profile.name = result['user'].name;
        this.profile.email = result['user'].email;
        this.profile.address = result['user'].address;
        this.profile.phone = 0+""+result['user'].phone;
        this.profile.filename = result['user'].filename;
        this.profile.tagline = result['user'].tagline;
      }
    )
  }

  updateProfile(form:NgForm){
    // console.log(form);
    const formData = new FormData();
    // formData.append('name', form['name']);
    // // formData.append('email', form['email']);
    // // formData.append('address', form['address']);
    // formData.append('phone', form['phone']);
    formData.append('filename', form['filename']);
    formData.append('tagline', 'hahahaha');
    // console.log(formData.getAll('name'));
    // this.profileService.updateProfile(form).subscribe(
    //   result=>{
    //     if(result){
    //       console.log(result);
    //     }
    //   }
    // )
    // console.log(this.form.get('filename').value);
    console.log(formData.get('filename'));
    this.profileService.updatePicture(formData).subscribe(
      result=>{
        console.log(result);
      }
    )
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('filename').setValue(file);
    }
  }

}
