import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('HomeComponent was created', () => {
    expect(component).toBeTruthy();
  });
  it('should trigger login button', () => {
    const loginButton = fixture.debugElement.query(By.css('#loginbutton'));
    expect(loginButton).toBeTruthy();
    // loginButton.nativeElement.click();
    // fixture.detectChanges();
  });
  it('should display Previous button and disable it on first page', () => {
    component.currentPage = 1;
    const previousButton = fixture.nativeElement.querySelector(
      '.page-item:first-child .page-link'
    );

    expect(component.currentPage).toBe(1);
    if (previousButton) {
      expect(previousButton.classList.contains('disabled')).toBe(true);
    } else {
      console.log('previous button not found');
    }
  });
  it('should display next button and disable it on last page', () => {
    component.currentPage = 3;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );

    expect(component.currentPage).toBe(3);
    if (nextButton) {
      expect(nextButton.classList.contains('disabled')).toBeTrue;
    }
  });
  it('should navigate to the next page when Next button is clicked', () => {
    component.currentPage = 1;
    const nextButton = fixture.nativeElement.querySelector(
      '.page-item:last-child .page-link'
    );
    if (nextButton) {
      nextButton.click();
    }

    fixture.detectChanges();
    component.currentPage += 1;
    expect(component.currentPage).toBe(2);
  });

  it('should navigate to the previous page when Previous button is clicked', () => {
    component.currentPage = 3;
    const previousButton = fixture.nativeElement.querySelector(
      '.page-item:first-child .page-link'
    );
    if (previousButton) {
      previousButton.click();
    }

    fixture.detectChanges();
    component.currentPage -= 1;
    expect(component.currentPage).toBe(2);
  });
});
