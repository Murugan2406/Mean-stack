import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CkServiceService {

  baseUri: string = 'http://localhost:4000/api/';
  // headers = new HttpHeaders().set('Content-Type', 'application/json');

  // httpOptions = {
    headers =  new HttpHeaders({
      'Authorization': localStorage.getItem('Tokken') || '',
      'content-type': 'application/json',
    })
  // };

  constructor(private http: HttpClient) { }

  createEmployee(data:any): Observable<any> {
    let url = `${this.baseUri}/create`;
    return this.http.post(url, data, { headers: this.headers }).pipe(catchError(this.errorMgmt));
  }
  // Get all employees
  getEmployees() {

    return this.http.get(`${this.baseUri}getEmployee`, { headers: this.headers } );
  }
  // Get employee
  getEmployee(id:any): Observable<any> {
    let url = `${this.baseUri}/read/${id}`;
    return this.http.get(url, { headers: this.headers }).pipe(
      map((res: any) => { return res || {};}),
      catchError(this.errorMgmt)
    );
  }
  // Update employee
  updateEmployee(id:any, data:any): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, { headers: this.headers })
      .pipe(catchError(this.errorMgmt));
  }

    // Delete employee
    deleteEmployee(id:any): Observable<any> {
      let url = `${this.baseUri}/delete/${id}`;
      return this.http
        .delete(url, { headers: this.headers })
        .pipe(catchError(this.errorMgmt));
    }
    // Error handling
    errorMgmt(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Get client-side error
        errorMessage = error.error.message;
      } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(() => {
        return errorMessage;
      });
    }



    createDesign(data:any): Observable<any> {
      let url = `${this.baseUri}/designcreate`;
      return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }



    fileReader(data:any): Observable<any> {
      let url = `${this.baseUri}/fileread`;
      return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }

    UserRegister(data:any): Observable<any> {
      let url = `${this.baseUri}register`;
      return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }
    Userlogin(data:any): Observable<any> {
      let url = `${this.baseUri}/login`;
      return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }

    retrieveNationalMapData(): Observable<any> {
      return this.http.get('app/asserts/MuruganCK.pdf');

    }

    payments(data:any) {
      console.log(data);
      // return
      
      return this.http.post(`${this.eCommerceUrl}payment`, data).pipe(catchError(this.errorMgmt));
    }


    getProducts() {
      // return this.http.get(`${this.baseUri}getEmployee`, { headers: this.headers } );


      return this.http.get(`${this.eCommerceUrl}/getProducs`);

      // return this.http.get('https://fakestoreapi.com/products');


    }
    
    eCommerceUrl: string = 'http://localhost:4000/apis/';

    
    addProduct(data:any): Observable<any> {
      let url = `${this.eCommerceUrl}/addProduct`;
      return this.http.post(url, data).pipe(catchError(this.errorMgmt));
    }


}
