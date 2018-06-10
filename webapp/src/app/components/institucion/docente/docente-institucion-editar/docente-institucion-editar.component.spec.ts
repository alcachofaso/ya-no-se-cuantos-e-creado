import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteInstitucionEditarComponent } from './docente-institucion-editar.component';

describe('DocenteInstitucionEditarComponent', () => {
  let component: DocenteInstitucionEditarComponent;
  let fixture: ComponentFixture<DocenteInstitucionEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteInstitucionEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteInstitucionEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
