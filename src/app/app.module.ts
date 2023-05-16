import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './components/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import {rootReducer} from './ngrx/reducer';
import { UserListComponent } from './components/user-list/user-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ApiService } from './services/api.service';
import { HttpService } from './services/http.service';
import { UserListService } from './services/user-list.service';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponentComponent } from './components/page-not-found-component/page-not-found-component.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ProductListComponent,
    LogoutComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    PageNotFoundComponentComponent,
    ContactUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [ApiService, HttpService, UserListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
