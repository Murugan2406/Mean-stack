import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {MatTableModule} from '@angular/material/table';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { LedgerComponent } from './ledger/ledger.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { SidenavComponent } from './sidenav/sidenav.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import { PaymentsuccessComponent } from './paymentsuccess/paymentsuccess.component';
import { PaymentfailureComponent } from './paymentfailure/paymentfailure.component';
// import { ListpageComponent } from './listpage/listpage.component';
import { CardComponent } from './card/card.component';
import { OrderComponent } from './order/order.component';
import { ListProductComponent } from './list-product/list-product.component';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LedgerComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    SidenavComponent,
    PaymentsuccessComponent,
    PaymentfailureComponent,
    // ListpageComponent,
    CardComponent,
    OrderComponent,
    ListProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,MatProgressSpinnerModule,MatAutocompleteModule,
    MatTableModule,ReactiveFormsModule,HttpClientModule,MatIconModule,
    BrowserAnimationsModule,MatSnackBarModule, FormsModule, MatInputModule, MatDialogModule,
    MatButtonModule,MatSidenavModule,MatToolbarModule,MatTooltipModule, MatMenuModule, MatSelectModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
