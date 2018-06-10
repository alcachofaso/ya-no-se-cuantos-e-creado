import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoEspecificoComponent } from './comunicado-especifico.component';

describe('ComunicadoEspecificoComponent', () => {
  let component: ComunicadoEspecificoComponent;
  let fixture: ComponentFixture<ComunicadoEspecificoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadoEspecificoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoEspecificoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
