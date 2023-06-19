import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicmodalComponent } from './basicmodal.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('BasicmodalComponent', () => {
  let component: BasicmodalComponent;
  let fixture: ComponentFixture<BasicmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicmodalComponent ],
      imports : [HttpClientModule, MatDialogModule,],
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
    fixture = TestBed.createComponent(BasicmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
