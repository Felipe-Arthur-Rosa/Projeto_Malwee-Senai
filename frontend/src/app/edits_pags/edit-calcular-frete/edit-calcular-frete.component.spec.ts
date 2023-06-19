import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCalcularFreteComponent } from './edit-calcular-frete.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('EditCalcularFreteComponent', () => {
  let component: EditCalcularFreteComponent;
  let fixture: ComponentFixture<EditCalcularFreteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCalcularFreteComponent ],
      imports : [HttpClientModule, MatDialogModule],
      providers: [
        {
          provide : MAT_DIALOG_DATA,
          useValue : {}
        }
      ]
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
