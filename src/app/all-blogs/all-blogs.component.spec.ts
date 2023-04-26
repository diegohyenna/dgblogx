import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AllBlogsComponent } from './all-blogs.component';
import { BlogService } from '../services/blog.service';
import { CategoryComponentComponent } from '../common/category-component/category-component.component';

describe('AllBlogsComponent', () => {
  let component: AllBlogsComponent;
  let fixture: ComponentFixture<AllBlogsComponent>;
  let blogServiceStub: jasmine.SpyObj<BlogService>;

  beforeEach(async () => {
    blogServiceStub = jasmine.createSpyObj('BlogService', ['getBlogList']);
    blogServiceStub.getBlogList.and.returnValue(of({}));
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [AllBlogsComponent, CategoryComponentComponent],
      providers: [{ provide: BlogService, useValue: blogServiceStub }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBlogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AllBlogsComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should fetch user data on initialization', () => {
    component.ngOnInit();
    expect(blogServiceStub.getBlogList).toHaveBeenCalled();
  });

  it('should display the category component', () => {
    const navbar = fixture.nativeElement.querySelector(
      'app-category-component'
    );
    expect(navbar).toBeDefined();
  });
});
