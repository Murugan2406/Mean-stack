import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from 'express';
import { CkServiceService } from '../Service/ck-service.service';
import * as pdfjsLib from 'pdfjs-dist';

import { HttpClient, HttpHeaders } from '@angular/common/http'; 
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

  loading= false;

  submitted = false;
  employeeForm: FormGroup | any;
  EmployeeProfile: any = ['Finance', 'BDM', 'HR', 'Sales', 'Admin', 'Action'];
  Id: any;
  edit: boolean = false;
  complete: any;
  // pdfToText: (data: any, callbackPageDone: (arg0: number, arg1: any) => void, callbackAllDone: (arg0: string) => void) => void;

  constructor(  private fbuilder: FormBuilder, public dialog: MatDialog,
    public fb: FormBuilder,
    public http: HttpClient,

    
    private apiService: CkServiceService) {
      pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';
     }

  ngOnInit(): void {
    this.mainForm();
    this.readEmployee()
  }
  createDesc(template:TemplateRef<any>){
    this.dialog.open(template)
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

  OpenPopUp(row:any){
this.Id = row._id
this.edit = true;
    this.employeeForm.patchValue(row)

  }

  ViewMore(data:any){
    console.log(data);
    
  }

  formSubmit(){
    if (!this.CreateAccBalance.valid) {
      alert('form Invalid')
      return false;
    } else {
      return this.apiService.createDesign(this.CreateAccBalance.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!');
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
   updateProfile(e:any) {
    this.employeeForm.get('designation').setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Getter to access form control
  get myForm() {
    return this.employeeForm.controls;
  }
  onSubmit() {
  console.log(this.employeeForm.value);
  
    if (!this.employeeForm.valid) {
      return false;
    } else {
      return this.apiService.createEmployee(this.employeeForm.value).subscribe({
        complete: () => {
          console.log('Employee successfully created!');
          this.employeeForm.reset()
          this.readEmployee()
        },
        error: (e) => {
          console.log(e);
        },
      });
    }
  }

  update(){
    if (!this.employeeForm.valid) {
      return ;
    } else {
    
      if (window.confirm('Are you sure?')) {
        let id = this.Id;
        this.apiService.updateEmployee(id, this.employeeForm.value).subscribe({
          complete: () => {
            this.employeeForm.reset()
            this.readEmployee()
            this.edit = false;
            console.log('Content updated successfully!');
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    }
  }

  readEmployee(){
    this.apiService.getEmployees().subscribe((data:any) => {
     this.datasource = new MatTableDataSource(data);
     console.log(this.datasource.data);
     
    })    
  }

  removeEmployee(employee:any, index:any) {
    console.log(index);
    
    if(window.confirm('Are you sure?')) {
        this.apiService.deleteEmployee(employee._id).subscribe((data) => {
      
          this.readEmployee()
        }
      )    
    }
  }

  convert(file:any){


    
    this.apiService.fileReader(file).subscribe((data:any) => {
 
      console.log(data);
      
     })  

    
//     const headerDict = {
//       'Content-Type': 'application/pdf',
//       'Accept': 'application/pdf',
//       'Access-Control-Allow-Headers': 'Content-Type',
//     }
//     const requestOptions = {                                                                                                                                                                                 
//       headers: new HttpHeaders(headerDict), 
//     };

// this.http.get("app/asserts/MuruganCK.pdf").subscribe((data:any) => {
//   console.log(data);
// })
    
  // this.readPdf("../asserts/MuruganCK's.pdf")
  
  }

}


