import { Component, OnInit } from '@angular/core';
import { CkServiceService } from 'app/Service/ck-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {

  products: any = [];

  qty = 1;


  
  producJson = [   {
    name: 'google pixels',
    productId: 12,
    price: 11150,
    desciption: 'google pixels mobile',
    image: 'https://images.unsplash.com/photo-1666238854836-815ff6c43b3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1001&q=80',
    rating: 5
  }, ]

  constructor(private apiService: CkServiceService) { }

  ngOnInit(): void {
    this.readEmployee()
    // this.addProduct()
  }
  addProduct() {
    this.apiService.addProduct(this.producJson).subscribe({
      next: (data: any) => {
        this.products = data
        console.log(data.products, data);

        // this.datasource = new MatTableDataSource(data);
      },
      error: (e: any) => {
        //  Swal.fire({ text: e })
      },
    })
  }



  readEmployee() {
    this.apiService.getProducts().subscribe({
      next: (data: any) => {
        this.products = data
        console.log(data.products, data);

        // this.datasource = new MatTableDataSource(data);
      },
      error: (e: any) => {
        //  Swal.fire({ text: e })
      },
    })

  }

  checkout(data:any) {
console.log(data);
// return
    this.apiService.payments(data).subscribe({
      next: (url: any) => {
        console.log(url);

        window.location = url
      },
      error: (e: any) => {
        Swal.fire({ text: e })
      },
    })
  }

}
