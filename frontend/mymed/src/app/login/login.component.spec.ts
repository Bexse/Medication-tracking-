import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';


// create a mock class of dependencies => try
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ // like Ng
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent); // creates component + template
    component = fixture.componentInstance; // sepates only the component.
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
