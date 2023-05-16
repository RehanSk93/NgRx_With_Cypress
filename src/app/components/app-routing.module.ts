import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { ProductListComponent } from './product-list/product-list.component';
import { LoginComponent } from '../pages/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, children: [
    {path: 'home', component: HomeComponent},
    {path: 'users', component: UserListComponent},
    {path: 'products', component: ProductListComponent},
    {path: 'contact', component: ContactUsComponent},
  ]},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
