import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecividosComponent } from './recividos.component';

describe('RecividosComponent', () => {
  let component: RecividosComponent;
  let fixture: ComponentFixture<RecividosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecividosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecividosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
