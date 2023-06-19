import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientComponent } from './edit-client.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('EditClientComponent', () => {
  let component: EditClientComponent;
  let fixture: ComponentFixture<EditClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientComponent ],
      imports : [HttpClientModule, MatDialogModule],
      providers: [
        {
          provide : MAT_DIALOG_DATA,
          useValue : {}
        },
        {
          provide : MatDialogRef,
          useValue: {},
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
