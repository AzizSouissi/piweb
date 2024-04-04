import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Payroll } from '../../../core/models/payroll';
import { PayrollService } from '../../../core/services/payroll.service';

@Component({
  selector: 'app-list-payroll',
  templateUrl: './list-payroll.component.html',
  styleUrls: ['./list-payroll.component.css'],
})
export class ListPayrollComponent implements OnInit {
  data: Payroll[] = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private payrollService: PayrollService
  ) {}

  ngOnInit() {
    this.payrollService.getAllPayrolls().subscribe((data) => {
      this.data = data;
    }),
      (error: any) => {
        console.error('Error fetching payrolls:', error);
      };
  }

  public getDataByDate(event: any) {
    const selectedDate = event.target.value;
    let formattedDate: string;
    if (selectedDate) {
      const dateObj = new Date(selectedDate);
      const year = dateObj.getFullYear();
      const month = dateObj.getMonth() + 1;

      formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
      this.payrollService
        .getPayrollsByMonth(formattedDate)
        .subscribe((data) => {
          this.data = data;
        });
    } else {
      this.payrollService.getAllPayrolls().subscribe((data) => {
        this.data = data;
      });
    }
  }
}
