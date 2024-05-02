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
        this.css = (this.taxableBase * this.cssr) / 12;

        // Create payroll object
        const payroll: Payroll = {
          id: '', // You can generate a unique ID here if needed
          userId: user.id,
          month: new Date().toISOString(),
          taxableSalary: this.taxableS,
          cnssdeduction:
            (user.basicSalary + this.totalAllowances - this.totalDeductions) *
            this.cnssr,
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

  public print(item: Payroll) {
    // Open a new window for printing
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      // Construct the HTML content
      const payslipContent = `

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payslip</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">

</head>

<body>
    <div class="container mt-5 mb-5">
        <div class="row">
            <div class="col-md-12">
                <div class="text-center lh-1 mb-2">
                    <h6 class="fw-bold">Payslip</h6>
                    <span class="fw-normal">Payment slip for the month of June 2021</span>
                </div>
                <div class="d-flex justify-content-end">
                    <span>Working Branch:ROHINI</span>
                </div>
                <div class="row">
                    <div class="col-md-10">
                        <div class="row">
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">EMP Code</span> <small class="ms-3">39124</small> </div>
                            </div>
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">EMP Name</span> <small class="ms-3">Ashok</small> </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">PF No.</span> <small class="ms-3">101523065714</small> </div>
                            </div>
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">NOD</span> <small class="ms-3">28</small> </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">ESI No.</span> <small class="ms-3"></small> </div>
                            </div>
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">Mode of Pay</span> <small class="ms-3">SBI</small> </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">Designation</span> <small class="ms-3">Marketing Staff (MK)</small> </div>
                            </div>
                            <div class="col-md-6">
                                <div> <span class="fw-bolder">Ac No.</span> <small class="ms-3">*******0701</small> </div>
                            </div>
                        </div>
                    </div>
                    <table class="mt-4 table table-bordered">
                        <thead class="bg-dark text-white">
                            <tr>
                                <th scope="col">Label</th>
                                <th scope="col">Number</th>
                                <th scope="col">Salary/Allowance</th>
                                <th scope="col">Deduction</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Basic Salary</th>
                                <td>16250.00</td>
                                <td>PF</td>
                                <td>1800.00</td>
                            </tr>
                            <tr>
                                <th scope="row">allowances</th>
                                <td>550.00</td>
                                <td>ESI</td>
                                <td>142.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Gross Salary</th>
                                <td>1650.00 </td>
                                <td>TDS</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <th scope="row">CNSS</th>
                                <td>120.00 </td>
                                <td>LOP</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Taxable Salary</th>
                                <td>0.00 </td>
                                <td>PT</td>
                                <td>0.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Total Taxes</th>
                                <td>0.00 </td>
                                <td>SPL. Deduction</td>
                                <td>500.00</td>
                            </tr>
                            <tr>
                                <th scope="row">Net Salary</th>
                                <td>3000.00</td>
                                <td>EWF</td>
                                <td>0.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="row">
                    <div class="col-md-4"> <br> <span class="fw-bold">Net Pay : 24528.00</span> </div>
                    <div class="border col-md-8"></div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>

      `;

      // Write the HTML content to the print window
      printWindow.document.write(payslipContent);

      // Close the document and print
      printWindow.document.close();
      printWindow.print();
    } else {
      console.error('Error: Failed to open print window.');
    }
  }
}
