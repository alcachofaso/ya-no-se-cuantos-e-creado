import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoComunidadComponent } from './comunicado-comunidad.component';

describe('ComunicadoComunidadComponent', () => {
  let component: ComunicadoComunidadComponent;
  let fixture: ComponentFixture<ComunicadoComunidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadoComunidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoComunidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
