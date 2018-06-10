import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PsicopedagogoCrearComponent } from './psicopedagogo-crear.component';

describe('PsicopedagogoCrearComponent', () => {
  let component: PsicopedagogoCrearComponent;
  let fixture: ComponentFixture<PsicopedagogoCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PsicopedagogoCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PsicopedagogoCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
