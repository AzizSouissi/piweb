import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAttendanceRecordComponent } from './update-attendance-record.component';

describe('UpdateAttendanceRecordComponent', () => {
  let component: UpdateAttendanceRecordComponent;
  let fixture: ComponentFixture<UpdateAttendanceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateAttendanceRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
