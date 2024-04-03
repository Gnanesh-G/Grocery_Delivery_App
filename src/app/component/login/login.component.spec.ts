import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from 'src/app/service/toaster.service';
import player from 'lottie-web';
import { LottieModule, ɵLOTTIE_OPTIONS } from 'ngx-lottie';
import { AuthService } from 'src/app/service/auth.service';

export function playerFactory() {
  return player;
}

const mockLottieOptions = {
  player: playerFactory,
};
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot(),
        LottieModule,
      ],
      providers: [
        ToasterService,
        AuthService,
        { provide: ɵLOTTIE_OPTIONS, useValue: mockLottieOptions },
      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('LoginComponent was created', () => {
    expect(component).toBeTruthy();
  });
});
