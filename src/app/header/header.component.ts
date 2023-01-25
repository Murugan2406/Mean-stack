import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  empname = ''

  constructor(  public router: Router,) { }

  ngOnInit(): void {
    const empName = localStorage.getItem('empName')

    if(empName){
this.empname = empName
    }else{
      Swal.fire({ text: 'UnAuthorized user please login' });
      this.router.navigate(["/login"])
    }
  }


  logout(){
    if (window.confirm('Are you sure to logout?')) {

       localStorage.removeItem('empName')
       localStorage.removeItem('Tokken');

       Swal.fire({ text: 'successfully logout' });
       this.router.navigate(["/login"])

    }
  }

}
