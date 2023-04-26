import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './services/auth.service';
import { of } from 'rxjs';
import { FooterComponent } from './common/footer/footer.component';
import { NavbarComponent } from './common/navbar/navbar.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let authServiceStub: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    authServiceStub = jasmine.createSpyObj('AuthService', ['fetchUserData']);
    authServiceStub.fetchUserData.and.returnValue(of(null));
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AppComponent, NavbarComponent, FooterComponent],
      providers: [{ provide: AuthService, useValue: authServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch user data on initialization', () => {
    component.ngOnInit();
    expect(authServiceStub.fetchUserData).toHaveBeenCalled();
  });

  it(`should have as title 'dgblogx'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('DGBlogX');
  });

  it('should display the navbar, router outlet, and footer components', () => {
    const navbar = fixture.nativeElement.querySelector('app-navbar');
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    const footer = fixture.nativeElement.querySelector('app-footer');
    expect(navbar).toBeDefined();
    expect(routerOutlet).toBeDefined();
    expect(footer).toBeDefined();
  });
});
