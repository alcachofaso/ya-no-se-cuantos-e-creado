import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicoDetalleComponent } from './psico-detalle.component';

describe('PsicoDetalleComponent', () => {
  let component: PsicoDetalleComponent;
  let fixture: ComponentFixture<PsicoDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicoDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
