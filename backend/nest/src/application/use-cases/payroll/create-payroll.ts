// create-payroll.ts

import { Injectable } from '@nestjs/common';
import { Payroll } from '@application/entities/payroll';
import { PayrollsRepository } from '@application/repositories/payrolls-repository';
import { CreatePayrollDto } from '@infra/http/dtos/create-payroll.dto';

@Injectable()
export class CreatePayroll {
  constructor(private payrollsRepository: PayrollsRepository) {}

  async execute(data: CreatePayrollDto): Promise<Payroll> {
    const {
      userId,
      month,
      basicSalary,
      cnssDeduction,
      taxableSalary,
      irpp,
      css,
      allowances,
      deductions,
      netSalary,
    } = data;

    // Create a new payroll instance
    const payroll = new Payroll({
      userId,
      month,
      basicSalary,
      cnssDeduction,
      taxableSalary,
      irpp,
      css,
      allowances,
      deductions,
      netSalary,
    });

    // Save the payroll to the repository
    await this.payrollsRepository.create(payroll);

    return payroll;
  }
}

// import { Injectable } from '@nestjs/common';
// import { Payroll } from '@application/entities/payroll';
// import { PayrollsRepository } from '@application/repositories/payrolls-repository';
// import { ConfigsRepository } from '@application/repositories/configs-repository';
// import { AttendancesRepository } from '@application/repositories/attendances-repository';
// import { Deduction } from '@application/entities/deduction';

// @Injectable()
// export class CreatePayroll {
//   constructor(
//     private payrollsRepository: PayrollsRepository,
//     private configsRepository: ConfigsRepository,
//     private attendancesRepository: AttendancesRepository,
//   ) {}

//   async execute(userId: string, month: Date): Promise<void> {
//     // Retrieve the configuration data
//     const config = await this.configsRepository.getConfig();

//     // Retrieve attendance records for the user in the given month
//     const attendanceRecords = await this.attendancesRepository.getUserAttendanceRecords(
//       userId,
//       month,
//     );

//     // Initialize deductions array
//     const deductions = [];

//     // Calculate other payroll data based on the configuration and attendance records
//     const basicSalary = 0; // Calculate the basic salary
//     const cnssdeduction = 0; // Calculate the CNSS deduction
//     const taxableSalary = 0; // Calculate the taxable salary
//     const irpp = 0; // Calculate the IRPP
//     const css = 0; // Calculate the CSS
//     const allowances = []; // Initialize allowances array
//     const netSalary = 0; // Calculate the net salary

//     // Check attendance records for absence and create deductions accordingly
//     for (const record of attendanceRecords) {
//       if (record.status === 'ABSENT') {
//         const description = `Absence deduction for ${record.date}`;
//         const amount = config.absenceDeductionAmount; // Get the deduction amount from config
//         const deduction = new Deduction({
//           userId,
//           description,
//           amount,
//         });
//         deductions.push(deduction);
//       }
//     }

//     // Create a new payroll instance
//     const payroll = new Payroll({
//       userId,
//       month,
//       basicSalary,
//       cnssdeduction,
//       taxableSalary,
//       irpp,
//       css,
//       allowances,
//       deductions,
//       netSalary,
//     });

//     // Save the payroll to the repository
//     await this.payrollsRepository.create(payroll);
//   }
// }
