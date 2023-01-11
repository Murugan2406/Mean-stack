import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  employeeForm: FormGroup | any;


  

  constructor( private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,) { }

  ngOnInit(): void {

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [Validators.required]],
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

  }

}
