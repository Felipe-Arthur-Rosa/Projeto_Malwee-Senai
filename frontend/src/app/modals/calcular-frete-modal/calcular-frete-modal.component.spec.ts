import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcularFreteModalComponent } from './calcular-frete-modal.component';

describe('CalcularFreteModalComponent', () => {
  let component: CalcularFreteModalComponent;
  let fixture: ComponentFixture<CalcularFreteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalcularFreteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalcularFreteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
