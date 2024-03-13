import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttendanceRecordComponent } from './list-attendance-record.component';

describe('ListAttendanceRecordComponent', () => {
  let component: ListAttendanceRecordComponent;
  let fixture: ComponentFixture<ListAttendanceRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListAttendanceRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAttendanceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
