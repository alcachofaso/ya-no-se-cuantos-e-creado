import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComunicadoNivelComponent } from './comunicado-nivel.component';

describe('ComunicadoNivelComponent', () => {
  let component: ComunicadoNivelComponent;
  let fixture: ComponentFixture<ComunicadoNivelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComunicadoNivelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComunicadoNivelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
