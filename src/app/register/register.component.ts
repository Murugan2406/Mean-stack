import { Router } from '@angular/router';
import { ComponentFixture } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CkServiceService } from '../Service/ck-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  employeeForm: FormGroup | any;

  user: any;
  loggedIn: any;

  constructor( private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,
    private apiService: CkServiceService,
    public router: Router,) { }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      FullName: ['', [Validators.required]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      PassWord: ['', [Validators.required]],
    });
  }

  focusNext(event:any, id:any){


    if(event.key === 'Enter' && event.target.value !== ''){

      setTimeout(() => {

        document.getElementById(id)?.focus()
      }, 100);


    }

  }


  onSubmit(){
console.log( this.employeeForm.valid, this.employeeForm.value);
this.apiService.UserRegister(this.employeeForm.value).subscribe({
  next: (data) => {
    this.employeeForm.reset()
    Swal.fire({ text: data.statusResponse });
    if(data.statusResponse === 'Success'){
      this.router.navigate(["login"])
    }
if( data.statusResponse.includes('Sucessfully')){
  console.log('sucess');

}

  },
  complete: () => {
  },
  error: (e) => {
    console.log(e);
  },
});
  }



}
