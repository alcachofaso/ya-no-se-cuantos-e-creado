import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoHistorialComponent } from './comunicado-historial.component';

describe('ComunicadoHistorialComponent', () => {
  let component: ComunicadoHistorialComponent;
  let fixture: ComponentFixture<ComunicadoHistorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadoHistorialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
