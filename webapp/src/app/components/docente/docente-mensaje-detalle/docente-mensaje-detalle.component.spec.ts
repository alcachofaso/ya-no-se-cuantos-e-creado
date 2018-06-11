import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocenteMensajeDetalleComponent } from './docente-mensaje-detalle.component';

describe('DocenteMensajeDetalleComponent', () => {
  let component: DocenteMensajeDetalleComponent;
  let fixture: ComponentFixture<DocenteMensajeDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocenteMensajeDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocenteMensajeDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
