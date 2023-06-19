import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubGroupComponent } from './sub-group.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('SubGroupComponent', () => {
  let component: SubGroupComponent;
  let fixture: ComponentFixture<SubGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubGroupComponent ],
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
    fixture = TestBed.createComponent(SubGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
