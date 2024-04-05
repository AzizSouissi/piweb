import { ConfigService } from './../../../core/services/config.service';
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
  isDate: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formB: FormBuilder,
    private payrollService: PayrollService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    let payDay: Date;
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    this.configService.getConfig().subscribe((config) => {
      let jour = Number(config[0].payDay);
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      payDay = new Date(currentYear, currentMonth - 1, jour);
    });
    this.payrollService.getAllPayrolls().subscribe((data) => {
      this.data = data;
      const lastPayDate = new Date(data[data.length - 1].month);
      console.log('last ', lastPayDate);
      console.log('paydate', payDay);
      console.log('current date', currentDate);
      console.log('current month', currentMonth);
      if (
        lastPayDate.getMonth() + 1 !== currentMonth &&
        currentDate >= payDay
      ) {
        this.isDate = false;
      } else {
        this.isDate = true;
      }
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
