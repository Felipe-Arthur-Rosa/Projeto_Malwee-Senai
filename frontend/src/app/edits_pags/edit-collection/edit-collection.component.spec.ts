import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCollectionComponent } from './edit-collection.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('EditCollectionComponent', () => {
  let component: EditCollectionComponent;
  let fixture: ComponentFixture<EditCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCollectionComponent ],
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
    fixture = TestBed.createComponent(EditCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
