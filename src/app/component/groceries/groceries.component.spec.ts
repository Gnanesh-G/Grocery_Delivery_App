import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { GroceriesComponent } from './groceries.component';
import { ToasterService } from 'src/app/service/toaster.service';
import { ToastrModule } from 'ngx-toastr';
import { urlEndpoint } from 'src/app/utils/constant';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('GroceriesComponent', () => {
  let component: GroceriesComponent;
  let fixture: ComponentFixture<GroceriesComponent>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroceriesComponent],
      imports: [
        HttpClientModule,
        ToastrModule.forRoot(),
        HttpClientTestingModule,
      ],
      providers: [ToasterService],
    });
    fixture = TestBed.createComponent(GroceriesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });
  it('GroceriesComponent was created', () => {
    expect(component).toBeTruthy();
  });
  it('should check get method was called', () => {
    const req = httpMock.expectOne(`${urlEndpoint.baseUrl}/admin/grocery/all`);
    expect(req.request.method).toEqual('GET');
  });
});
