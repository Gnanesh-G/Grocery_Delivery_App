import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CartComponent } from './cart.component';
import { LottieModule, ɵLOTTIE_OPTIONS } from 'ngx-lottie';
import player from 'lottie-web';
import { AuthService } from 'src/app/service/auth.service';
export function playerFactory() {
  return player;
}

const mockLottieOptions = {
  player: playerFactory,
};
describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [HttpClientModule, LottieModule],
      providers: [
        AuthService,
        { provide: ɵLOTTIE_OPTIONS, useValue: mockLottieOptions },
      ],
    });
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('CartComponent was created', () => {
    expect(component).toBeTruthy();
  });
});
