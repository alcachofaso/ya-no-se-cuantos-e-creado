import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteListadoTrabajoComponent } from './docente-listado-trabajo.component';

describe('DocenteListadoTrabajoComponent', () => {
  let component: DocenteListadoTrabajoComponent;
  let fixture: ComponentFixture<DocenteListadoTrabajoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteListadoTrabajoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteListadoTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
