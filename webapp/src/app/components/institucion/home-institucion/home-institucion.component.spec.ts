import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInstitucionComponent } from './home-institucion.component';

describe('HomeInstitucionComponent', () => {
  let component: HomeInstitucionComponent;
  let fixture: ComponentFixture<HomeInstitucionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeInstitucionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
