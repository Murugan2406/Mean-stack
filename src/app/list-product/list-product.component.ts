import { Component, OnInit } from '@angular/core';
import { CkServiceService } from 'app/Service/ck-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products:any = []

  constructor( private apiService: CkServiceService) { }

  ngOnInit(): void {
    this.readEmployee()
  }




  readEmployee() {
    this.apiService.getProducts().subscribe({
      next: (data:any) => {
        this.products = data.products
        console.log(data.products, data);
        
        // this.datasource = new MatTableDataSource(data);
      },
      error: (e:any) => {
        //  Swal.fire({ text: e })
      },
  })

  }

  checkout(){
    const data:any = JSON.stringify({
     items : [
         {id:1, quantity:3 },
         {id:2, quantity:3 },
   
       ]
     }
       )
      
       this.apiService.payments(data).subscribe({
         next: (url:any) => {
         console.log(url);
         
           window.location = url       
         },
         error: (e:any) => {
            Swal.fire({ text: e })
         },
     })
     }
  
}
