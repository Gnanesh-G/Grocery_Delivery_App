import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { GroceriesComponent } from './component/groceries/groceries.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';

import { AdminCategoryComponent } from './component/admin/category/category.component';
import { AdminUserComponent } from './component/admin/user/user.component';
import { AdminorderComponent } from './component/admin/order/order.component';
import { AdminGroceryComponent } from './component/admin/grocery/grocery.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'grocery', component: GroceriesComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'order', component: OrderComponent, canActivate: [authGuard] },
  { path: 'userProfile', component: UserProfileComponent, canActivate: [authGuard] },
  {
    path: 'admin/user',
    component: AdminUserComponent,
    canActivate: [authGuard],
  },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  {
    path: 'admin/category',
    component: AdminCategoryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/grocery',
    component: AdminGroceryComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin/order',
    component: AdminorderComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
