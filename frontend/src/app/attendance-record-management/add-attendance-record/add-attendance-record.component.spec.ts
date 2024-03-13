import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAttendanceRecordComponent } from './add-attendance-record.component';

describe('AddAttendanceRecordComponent', () => {
  let component: AddAttendanceRecordComponent;
  let fixture: ComponentFixture<AddAttendanceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddAttendanceRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
