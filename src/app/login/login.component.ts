import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CkServiceService } from '../Service/ck-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  employeeForm: FormGroup | any;




  constructor( private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,
    private apiService: CkServiceService,
    public router: Router,
    ) { }

  ngOnInit(): void {




    this.employeeForm = this.fb.group({
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
this.apiService.Userlogin(this.employeeForm.value).subscribe({
  next: (data) => {
    Swal.fire({ text: data.StatusResponse });
    this.employeeForm.reset();
localStorage.setItem('empName',  data.FullName)

localStorage.setItem('Tokken',  data.AccessToken)
// console.log(data.StatusResponse);

if( data.StatusResponse.includes('Sucessfully')){
  console.log('sucess');
  this.router.navigate(["dashboard"])

}
  },
  error: (e) => {
    console.log(e);
  },
  complete: () => {

  },
});
  }

}
