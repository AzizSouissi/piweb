import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';
import { UpdateAttendanceTrackingDto } from './dto/update-attendance-tracking.dto';
import {
  AttendanceRecord,
  Employee,
  PrismaClient,
  Status,
} from '@prisma/client';
import { type Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AttendanceTrackingService {
  constructor(private readonly prisma: PrismaService) {
    let includePosts: boolean = false;
    let attendanceRecord: Prisma.AttendanceRecordCreateInput;
    let employe: Prisma.EmployeeCreateInput;
  }
  async create(
    employeeId: string,
    createAttendanceTrackingDto: CreateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    try {
      const currentDate = new Date().toISOString().split('T')[0];

      const existingRecord = await this.prisma.attendanceRecord.findFirst({
        where: {
          date: currentDate,
          employeeId: employeeId,
        },
      });

      if (existingRecord) {
        return {
          message: 'You already created an attendance for today.',
        };
      }

      // Create the attendance record
      const createdRecord = await this.prisma.attendanceRecord.create({
        data: {
          date: currentDate,
          shiftType: createAttendanceTrackingDto.shiftType,
          status: createAttendanceTrackingDto.status,
          absent_reason: createAttendanceTrackingDto.absent_reason,
          employee: {
            connect: { id: employeeId },
          },
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absent_reason: true,
        },
      });
      return createdRecord;
    } catch (error) {
      console.error('Error creating attendance record:', error);
      throw new Error('Failed to create attendance record');
    }
  }

  find(id: string): Promise<Employee> {
    return this.prisma.employee.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        employee_id: true,
        name: true,
        job: true,
        attendanceRecord: true,
      },
    });
  }
  async updateEmployeeWithAttendance(
    id: string,
    employeeData: Employee,
  ): Promise<Employee> {
    try {
      // Find the employee by ID
      const existingEmployee = await this.prisma.employee.findUnique({
        where: { id },
        include: { attendanceRecord: true }, // Include the associated attendance records
      });

      if (!existingEmployee) {
        throw new Error(`Employee with ID ${id} not found`);
      }

      // Update employee details
      const updatedEmployee = await this.prisma.employee.update({
        where: { id },
        data: employeeData,
      });

      // Update attendance records
      await Promise.all(
        existingEmployee.attendanceRecord.map(async (record) => {
          await this.prisma.attendanceRecord.update({
            where: { id: record.id },
            data: {},
          });
        }),
      );

      return updatedEmployee;
    } catch (error) {
      console.error('Error updating employee with attendance:', error);
      throw new Error('Failed to update employee with attendance');
    }
  }

  async findAll(): Promise<AttendanceRecord[]> {
    return this.prisma.attendanceRecord.findMany();
  }

  async findAllEmployees(): Promise<
    (Employee & { attendanceRecords: AttendanceRecord[] })[] | any
  > {
    try {
      const employees = await this.prisma.employee.findMany({
        include: {
          attendanceRecord: true,
        },
      });
      return employees;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return 'Error fetching employees';
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedRecord = await this.prisma.attendanceRecord.delete({
        where: {
          id: id,
        },
      });

      // If a record is returned, deletion was successful
      return true;
    } catch (error) {
      console.error('Error deleting attendance record:', error);
      throw new Error('Failed to delete attendance record');
    }
  }
  async findEmployeesAttendance(month: number, year: number) {
    try {
      const startDate = new Date(`${year}-${month}-01`);
      const endDate = new Date(year, month, 0);
      const attendanceRecords = await this.prisma.attendanceRecord.findMany({
        where: {
          AND: [
            { date: { gte: startDate.toISOString() } },
            { date: { lt: endDate.toISOString() } },
          ],
        },
        include: {
          employee: true,
        },
      });

      const employeesAttendance = attendanceRecords.reduce((acc, record) => {
        const { employee } = record;
        if (!acc[employee.id]) {
          acc[employee.id] = {
            employeeId: employee.id,
            name: employee.name,
            job: employee.job,
            attendanceRecord: [record],
          };
        } else {
          acc[employee.id].attendanceRecord.push(record);
        }
        return acc;
      }, {});

      const result = Object.values(employeesAttendance);

      return result;
    } catch (error) {
      throw new Error(`Failed to fetch employees attendance: ${error.message}`);
    }
  }
  async getAttendanceByEmployeeIdAndDate(
    employeeId: string,
    date: string,
  ): Promise<AttendanceRecord | null> {
    try {
      const attendanceRecord = await this.prisma.attendanceRecord.findFirst({
        where: {
          employeeId: employeeId,
          date: date,
        },
      });

      return attendanceRecord;
    } catch (error) {
      console.error('Error fetching attendance record:', error);
      throw new Error('Failed to fetch attendance record');
    }
  }
}
