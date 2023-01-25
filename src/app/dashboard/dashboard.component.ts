import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CkServiceService } from '../Service/ck-service.service';
import * as pdfjsLib from 'pdfjs-dist';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
// import {PDFExtract, PDFExtractOptions} from 'pdf.js-extract';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  displayedColumns: any = [
    'S.No',
    'name',
    '_id',
    'email',
    'designation',
    'phoneNumber',
    'Edit',
    'Delete'
  ];

  CreateAccBalance = this.fbuilder.group({
    decCode: ['', Validators.required],
    decName: ['', Validators.required],

  });

  datasource = new MatTableDataSource([]);

  loading = false;

  submitted = false;
  employeeForm: FormGroup | any;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin', 'Action'];
  Id: any;
  edit: boolean = false;
  complete: any;
  // pdfToText: (data: any, callbackPageDone: (arg0: number, arg1: any) => void, callbackAllDone: (arg0: string) => void) => void;

  constructor(private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,
    public router: Router,
    private apiService: CkServiceService) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
  }

  ngOnInit(): void {

    localStorage.setItem('number', '123')

    const token = localStorage.getItem('Tokken')

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

  formSubmit() {
    if (!this.CreateAccBalance.valid) {
      alert('form Invalid')
      return false;
    } else {
      return this.apiService.createDesign(this.CreateAccBalance.value).subscribe({
        complete: () => {

          this.CreateAccBalance.reset()
          this.readEmployee()
        },
        error: (e) => {
          console.log(e);
        },
      });
    }

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
          console.log(e);
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
            console.log(e);
          },
          complete: () => {

          },
        });
      }
    }
  }

  readEmployee() {
    this.apiService.getEmployees().subscribe((data: any) => {
      this.datasource = new MatTableDataSource(data);
    })
  }

  removeEmployee(employee: any, index: any) {
    console.log(employee._id);
    // return

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
          console.log(e);
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

}


