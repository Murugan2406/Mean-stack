import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CkServiceService } from '../Service/ck-service.service';
import * as pdfjsLib from 'pdfjs-dist';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: any = ['S.No','_id','name', 'email','designation','phoneNumber', 'Edit','Delete'  ];

  datasource = new MatTableDataSource([]);

  loading = false;

  submitted = false;
  employeeForm: FormGroup | any;
  EmployeeProfile: any = ['FrontEnd', 'BackEnd', 'DataBase', 'UI'];
  Id: any;
  edit: boolean = false;
  complete: any;

  constructor(private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    private apiService: CkServiceService) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
  }

  ngOnInit(): void {
    const token = localStorage.getItem('Tokken');
    if(token){

    this.mainForm();
    this.readEmployee()
  }else{
    Swal.fire({ text: 'UnAuthorized user please login' });
    this.router.navigate(["/login"])
  }
  }
  createDesc(template: TemplateRef<any>) {
    this.edit = false;
    this.employeeForm.reset();
    this.dialog.open(template, { maxWidth: '500px', disableClose: true })
  }

  mainForm() {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      designation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  OpenPopUp(row: any, template: TemplateRef<any>) {
    this.Id = row._id
    this.edit = true;
    this.employeeForm.patchValue(row)
    this.dialog.open(template, { maxWidth: '500px', disableClose: true })

  }

  // Choose designation with select dropdown
  updateProfile(e: any) {
    this.employeeForm.get('designation').setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }
  createEmployee() {

    if (!this.employeeForm.valid) {
      Swal.fire({ text: 'Please Fill All the fields' })
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        next: (response) => {
          if (response && response.StatusResponse === 'Success') {
            this.dialog.closeAll()
            this.employeeForm.reset();
            Swal.fire({ text: 'New Employee created successfully' })
            this.readEmployee();
          } else {
            Swal.fire({ text: 'No Record Found' })
          }

        },
        complete: () => {
        },
        error: (e) => {
           Swal.fire({ text: e })
        },
      });
    }
  }

  updateEmployees() {
    if (!this.employeeForm.valid) {
      Swal.fire({ text: 'Please Fill All the fields' })

      return;
    } else {

      if (window.confirm('Are you sure?')) {
        let id = this.Id;
        this.apiService.updateEmployee(id, this.employeeForm.value).subscribe({


          next: (response) => {
            if (response && response.StatusResponse === 'Success') {
              this.dialog.closeAll()
              this.employeeForm.reset();
              Swal.fire({ text: 'Employee Data Updated successfully' })
              this.readEmployee();
            } else {
              Swal.fire({ text: 'No Record Found' })
            }

          },

          error: (e) => {
             Swal.fire({ text: e })
          },
          complete: () => {

          },
        });
      }
    }
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe({
      next: (data:any) => {
        this.datasource = new MatTableDataSource(data);
      },
      error: (e:any) => {
         Swal.fire({ text: e })
      },
  })

  }

  removeEmployee(employee: any, index: any) {

    if (window.confirm('Are you sure?')) {
      this.apiService.deleteEmployee(employee._id).subscribe({
        next: (response) => {
          if (response && response.StatusResponse === 'Success') {
            this.dialog.closeAll()
            this.employeeForm.reset();
            Swal.fire({ text: 'Employee Data Updated successfully' })
            this.readEmployee();
          } else {
            Swal.fire({ text: 'No Record Found' })
          }
        },
        error: (e) => {
           Swal.fire({ text: e })
        },
        complete: () => {

        },
      });
    }
  }

  convert(file: any) {
    this.apiService.fileReader(file).subscribe((data: any) => {
      console.log(data);
    })
  }


  focusNext(event: any, id: any) {
    if (event.key === 'Enter' && event.target.value !== '') {
      setTimeout(() => {
        document.getElementById(id)?.focus()
      }, 100);
    }

  }

  designChoosen(event:any){
    if(event.isUserInput){
document.getElementById('phnumber')?.focus()

    }
  }

}


