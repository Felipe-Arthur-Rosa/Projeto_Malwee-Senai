import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularFreteComponent } from './calcular-frete.component';

describe('CalcularFreteComponent', () => {
  let component: CalcularFreteComponent;
  let fixture: ComponentFixture<CalcularFreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcularFreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
