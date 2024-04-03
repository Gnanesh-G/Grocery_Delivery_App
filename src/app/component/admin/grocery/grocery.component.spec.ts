import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminGroceryComponent } from './grocery.component';
import { urlEndpoint } from 'src/app/utils/constant';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('AdminGroceryComponent', () => {
  let component: AdminGroceryComponent;
  let fixture: ComponentFixture<AdminGroceryComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminGroceryComponent],
      imports: [HttpClientModule, FormsModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AdminGroceryComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  it('AdminGroceryComponent was created', () => {
    expect(component).toBeTruthy();
  });
  it('should check get method was called', () => {
    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/admin/grocery/all`);
    expect(req.request.method).toEqual('GET');
  });
});
