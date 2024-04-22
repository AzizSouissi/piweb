import { ConfigService } from './../../../core/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Payroll } from '../../../core/models/payroll';
import { PayrollService } from '../../../core/services/payroll.service';
import { User } from '../../../core/models/User';
import { Allowance } from '../../../core/models/allowance';

@Component({
  selector: 'app-list-payroll',
  templateUrl: './list-payroll.component.html',
  styleUrls: ['./list-payroll.component.css'],
})
export class ListPayrollComponent implements OnInit {
  data: Payroll[] = [];
  isDate: boolean = false;
  users!: User[];
  totalAllowances!: number;
  totalDeductions!: number;
  cssrate!: number;
  cnssrate!: number;
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
      this.cssrate = config[0].cssRate;
      this.cnssrate = config[0].cnssRate;
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

  public pay() {
    this.payrollService.getAllUsers().subscribe((users) => {
      for (const user of users) {
        const basicSalary = user.basicSalary;
        const allowances = user.allowances;
        for (const allowance of allowances) {
          this.totalAllowances += allowance.amount;
        }
        const deductions = user.deductions;
        for (const deduction of deductions) {
          this.totalDeductions += deduction.amount;
        }
        const taxableSalary =
          (user.basicSalary + this.totalAllowances - this.totalDeductions) * (1 - this.cnssrate);
        let taxableBase = taxableSalary * 12 - 2000;
        if (user.familySituation === 1) {
          taxableBase -= 300;
          taxableBase -= user.childrenNumber * 100;
        }
        let taxAmount = 0;
        if (taxableBase <= 5000) {
          taxAmount = 0;
        } else if (taxableBase <= 20000) {
          taxAmount = (taxableBase - 5000) * 0.26;
        } else if (taxableBase <= 30000) {
          taxAmount = 3900 + (taxableBase - 20000) * 0.28;
        } else if (taxableBase <= 50000) {
          taxAmount = 5600 + (taxableBase - 30000) * 0.32;
        } else {
          taxAmount = 11920 + (taxableBase - 50000) * 0.35;
        }
        const payroll: Payroll = {
          id: '',
          userId: user.id,
          month: new Date().toISOString(),
          taxableSalary: taxableSalary,
          cnssdeduction: (user.basicSalary + this.totalAllowances - this.totalDeductions) * this.cnssrate,
          irpp: taxAmount/12,
          css: (taxableBase/this.cssrate)/12,
          netSalary: taxableSalary - taxAmount/12 - (taxableBase/this.cssrate)/12,
        };
        this.payrollService.createPayroll(payroll).subscribe(
          () => {
            console.log('Payroll created successfully for user: ', user.id);
          },
          (error) => {
            console.error('Error creating payroll for user: ', user.id, error);
          }
        );
      }
    });
  }
}
