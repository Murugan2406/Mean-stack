import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, MinLengthValidator } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CkServiceService } from '../Service/ck-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { min } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  registerForm: FormGroup | any;



  showlogin = true



  constructor( private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,
    private apiService: CkServiceService,
    public router: Router,
    ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [
        'muruganck4you@gmail.com',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      Password: ['Murugan@123', [Validators.required]],
    });
    this.registerForm = this.fb.group({
      FullName: ['', [Validators.required]],
      Email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      Password: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  focusNext(event:any, id:any){
    if(event.key === 'Enter' && event.target.value !== ''){
      setTimeout(() => {
        document.getElementById(id)?.focus()
      }, 100);
    }
  }


  loginSubmit(){
    console.log(this.loginForm.valid, this.loginForm);


    if(this.loginForm.get('Email').value && this.loginForm.controls.Email.status === 'INVALID'){
      Swal.fire({ text: 'Please enter valid email'});
      return
      }
      if(this.loginForm.get('Password').value && this.loginForm.controls.Password.status === 'INVALID'){
        Swal.fire({ text: 'Please enter min 5 charecter'});
        return
        }
      if(this.loginForm.invalid){
        Swal.fire({ text: 'Please fill all fields'});
        return
        }
this.apiService.Userlogin(this.loginForm.value).subscribe({
  next: (data) => {
    Swal.fire({ text: data.StatusResponse });
    this.loginForm.reset();

if( data.StatusResponse.includes('Sucessfully')){
  localStorage.setItem('empName',  data.FullName)
  localStorage.setItem('Tokken',  data.AccessToken)
  Swal.fire({text:data.StatusResponse})
  setTimeout(() => {

    this.router.navigate(["dashboard"])
  }, 1000);


}
  },
  error: (e) => {
     Swal.fire({ text: e })
  },
  complete: () => {

  },
});
  }




  onSubmit(){
    this.apiService.UserRegister(this.registerForm.value).subscribe({
      next: (data) => {

        this.registerForm.reset()
        Swal.fire({ text: data.statusResponse });
        if(data.statusResponse === 'Success'){
          this.toggleform()
          // this.router.navigate(["login"])
        }

      },
      complete: () => {
      },
      error: (e) => {
         Swal.fire({ text: e })
      },
    });
      }


  toggleform(){

    // const elements = document.querySelectorAll('.gcardContainer');

    // elements.style.backgroundColor = 'pink';
    if(this.showlogin){
    const data =  document.getElementById('gcardContainer') as HTMLElement
    data.style.transform = "rotateY(180deg)" || ''
    this.showlogin = !this.showlogin
    }else{
      const data =  document.getElementById('gcardContainer') as HTMLElement
    data.style.transform = "rotateY(0deg)" || ''
    this.showlogin = !this.showlogin
    }


  }
}
