import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AdminorderComponent } from './order.component';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { urlEndpoint } from 'src/app/utils/constant';

describe('AdminorderComponent', () => {
  let component: AdminorderComponent;
  let fixture: ComponentFixture<AdminorderComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminorderComponent],
      imports: [HttpClientModule, HttpClientTestingModule],
    });
    fixture = TestBed.createComponent(AdminorderComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  it('AdminorderComponent was created', () => {
    expect(component).toBeTruthy();
  });
  it('should check get method was called', () => {
    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/admin/order/all`);
    expect(req.request.method).toEqual('GET');
  });
});
