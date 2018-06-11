import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteNotasComponent } from './docente-notas.component';

describe('DocenteNotasComponent', () => {
  let component: DocenteNotasComponent;
  let fixture: ComponentFixture<DocenteNotasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteNotasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
