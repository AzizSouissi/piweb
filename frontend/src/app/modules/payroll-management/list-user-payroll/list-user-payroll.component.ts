import { Component, OnInit } from '@angular/core';
import { Payroll } from '../../../core/models/payroll';
import { PayrollService } from '../../../core/services/payroll.service';

@Component({
  selector: 'app-list-user-payroll',
  templateUrl: './list-user-payroll.component.html',
  styleUrl: './list-user-payroll.component.css',
})
export class ListUserPayrollComponent implements OnInit {
  data!: Payroll[];
  id!: any;
  constructor(private payrollService: PayrollService) {}

  ngOnInit() {
    let p = localStorage.getItem('user');
    if (p) {
      let email = JSON.parse(p)['email'];
      this.payrollService.getUserIdByEmail(email).subscribe((data) => {
        this.id = data.id;
        this.getDataByUser(this.id);
      });
    }
  }

  public getDataByUser(id: string) {
    this.payrollService.getPayrollsByUserId(id).subscribe((data) => {
      this.data = data;
    });
  }
}
