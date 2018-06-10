import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteHomeComponent } from './docente-home.component';

describe('DocenteHomeComponent', () => {
  let component: DocenteHomeComponent;
  let fixture: ComponentFixture<DocenteHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
