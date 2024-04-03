import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToasterService } from './service/toaster.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { GroceriesComponent } from './component/groceries/groceries.component';
import { OrderComponent } from './component/order/order.component';
import { UserProfileComponent } from './component/user-profile/user-profile.component';
import { AdminCategoryComponent } from './component/admin/category/category.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminUserComponent } from './component/admin/user/user.component';
import { AdminGroceryComponent } from './component/admin/grocery/grocery.component';
import { AdminorderComponent } from './component/admin/order/order.component';
import { AppRoutingModule, routes } from './app-routing.module';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,

        HomeComponent,
        LoginComponent,
        RegisterComponent,
        AdminHomeComponent,
        GroceriesComponent,
        CartComponent,
        OrderComponent,
        AdminGroceryComponent,
        AdminUserComponent,
        AdminorderComponent,
        AdminCategoryComponent,
        UserProfileComponent,
      ],
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        AppRoutingModule,
        RouterTestingModule,
      ],
      providers: [ToasterService],
    });
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });
  it('AppComponent was created', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Angular_Unit_Testing'`, () => {
    expect(component.title).toEqual('Grocery_Delivery_App');
  });

  it('should navigate to home page after clicking home icon', () => {
    fixture.detectChanges();
    const groceryLink = fixture.debugElement.query(By.css('a[routerLink="/"]'));
    if (groceryLink) {
      expect(groceryLink).toBeTruthy();
      groceryLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('/');
      });
    }
  });

  it('should navigate to grocery page after clicking grocery icon', () => {
    fixture.detectChanges();
    const groceryLink = fixture.debugElement.query(
      By.css('a[routerLink="/grocery"]')
    );
    if (groceryLink) {
      expect(groceryLink).toBeTruthy();
      groceryLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('/grocery');
      });
    }
  });

  it('should navigate to cart page after clicking cart icon', () => {
    fixture.detectChanges();
    const cartLink = fixture.debugElement.query(By.css('a[routerink="/cart"]'));

    if (cartLink) {
      expect(cartLink).toBeTruthy();
      cartLink.nativeElement.click();
      let spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable();
      expect(spyNavigate).toHaveBeenCalledWith('/cart');
    }
  });

  it('should navigate to order page after clicking order icon', () => {
    fixture.detectChanges();
    const groceryLink = fixture.debugElement.query(
      By.css('a[routerLink="/order"]')
    );
    if (groceryLink) {
      expect(groceryLink).toBeTruthy();
      groceryLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('/order');
      });
    }
  });

  it('should navigate to user profile page after clicking user profile icon', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="/userProfile"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      fixture.whenStable().then(() => {
        const spyNavigate = spyOn(router, 'navigateByUrl');
        expect(spyNavigate).toHaveBeenCalledWith('/userProfile');
      });
    }
  });

  it('should navigate to admin page after clicking dashboard', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="admin"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('admin');
      });
    }
  });

  it('should navigate to admin categories page after clicking categories icon', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="admin/category"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('admin/category');
      });
    }
  });

  it('should navigate to admin grocery page after clicking groceries icon', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="admin/grocery"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('admin/grocery');
      });
    }
  });

  it('should navigate to admin order page after clicking order icon', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="admin/order"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('admin/order');
      });
    }
  });

  it('should navigate to admin user page after clicking user icon', () => {
    fixture.detectChanges();
    const userprofileLink = fixture.debugElement.query(
      By.css('a[routerLink="admin/user"]')
    );
    if (userprofileLink) {
      expect(userprofileLink).toBeTruthy();
      userprofileLink.nativeElement.click();
      const spyNavigate = spyOn(router, 'navigateByUrl');
      fixture.whenStable().then(() => {
        expect(spyNavigate).toHaveBeenCalledWith('admin/userr');
      });
    }
  });
});
