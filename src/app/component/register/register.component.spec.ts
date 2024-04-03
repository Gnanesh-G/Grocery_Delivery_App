import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ToasterService } from 'src/app/service/toaster.service';
import player from 'lottie-web';
import { LottieModule, ɵLOTTIE_OPTIONS } from 'ngx-lottie';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterComponent } from './register.component';

export function playerFactory() {
  return player;
}

const mockLottieOptions = {
  player: playerFactory,
};
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('RegisterComponent was created', () => {
    expect(component).toBeTruthy();
  });
});
