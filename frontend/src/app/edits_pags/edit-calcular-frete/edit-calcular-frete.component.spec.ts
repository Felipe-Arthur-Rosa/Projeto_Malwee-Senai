import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalcularFreteComponent } from './edit-calcular-frete.component';

describe('EditCalcularFreteComponent', () => {
  let component: EditCalcularFreteComponent;
  let fixture: ComponentFixture<EditCalcularFreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCalcularFreteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCalcularFreteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
