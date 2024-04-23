import { ConfigService } from './../../../core/services/config.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Payroll } from '../../../core/models/payroll';
import { PayrollService } from '../../../core/services/payroll.service';
import { User } from '../../../core/models/User';
import { Allowance } from '../../../core/models/allowance';
import { validateHeaderValue } from 'http';

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
  cssr!: number;
  cnssr!: number;
  taxableBase!: number;
  taxAmount!: number;
  taxableS!: number;
  css!: number;
  netSalary!: number;
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
      this.cssr = config[0].cssrate;
      this.cnssr = config[0].cnssrate;
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
        this.totalAllowances = 0;
        this.totalDeductions = 0;

        // Calculate total allowances
        for (const allowance of user.allowances) {
          this.totalAllowances += allowance.amount;
        }

        // Calculate total deductions
        for (const deduction of user.deductions) {
          this.totalDeductions += deduction.amount;
        }

        // Calculate taxable salary
        this.taxableS =
          (user.basicSalary + this.totalAllowances - this.totalDeductions) *
          (1 - this.cnssr);

        // Calculate taxable base
        this.taxableBase = this.taxableS * 12 - 2000;
        if (user.familySituation == 1) {
          this.taxableBase -= 300;
          this.taxableBase -= user.childrenNumber * 100;
        }

        // Calculate tax amount
        this.taxAmount = 0;
        if (this.taxableBase <= 5000) {
          this.taxAmount = 0;
        } else if (this.taxableBase <= 20000) {
          this.taxAmount = (this.taxableBase - 5000) * 0.26;
        } else if (this.taxableBase <= 30000) {
          this.taxAmount = 3900 + (this.taxableBase - 20000) * 0.28;
        } else if (this.taxableBase <= 50000) {
          this.taxAmount = 5600 + (this.taxableBase - 30000) * 0.32;
        } else {
          this.taxAmount = 11920 + (this.taxableBase - 50000) * 0.35;
        }

        // Calculate CSS (Contribution sociale de solidarité)
        this.css = this.taxableBase * this.cssr / 12;

        // Create payroll object
        const payroll: Payroll = {
          id: '', // You can generate a unique ID here if needed
          userId: user.id,
          month: new Date().toISOString(),
          taxableSalary: this.taxableS,
          cnssdeduction:(user.basicSalary + this.totalAllowances - this.totalDeductions) * this.cnssr,
          irpp: this.taxAmount / 12,
          css: this.css,
          netSalary: this.taxableS - this.taxAmount / 12 - this.css,
        };

        // Create payroll entry
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
