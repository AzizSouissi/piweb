import { Component, OnInit } from '@angular/core';
import { Payroll } from '../../../core/models/payroll';
import { PayrollService } from '../../../core/services/payroll.service';

@Component({
  selector: 'app-list-user-payroll',
  templateUrl: './list-user-payroll.component.html',
  styleUrl: './list-user-payroll.component.css',
})
export class ListUserPayrollComponent implements OnInit {
  data: Payroll[] = [];
  constructor(private payrollService: PayrollService) {}

  ngOnInit() {
    /* this.payrollService.getAllPayrolls().subscribe((data) => {
      this.data = data;
    }),
      (error: any) => {
        console.error('Error fetching payrolls:', error);
      };
      */
    this.getDataByUser('660eb4a61dbf9e0ddc017b26');
  }

  public getDataByUser(id: string) {
    this.payrollService.getPayrollsByUserId(id).subscribe((data) => {
      this.data = data;
    });
  }
}
