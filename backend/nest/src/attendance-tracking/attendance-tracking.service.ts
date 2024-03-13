import { Injectable } from '@nestjs/common';
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

  

  async update(
    id: string,
    updateAttendanceTrackingDto: UpdateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    try {
      const updatedRecord = await this.prisma.attendanceRecord.update({
        where: { id: id }, // Specify which attendance record to update based on the id
        data: {
          date: updateAttendanceTrackingDto.date,
          shiftType: updateAttendanceTrackingDto.shiftType,
          status: updateAttendanceTrackingDto.status,
          absent_reason: updateAttendanceTrackingDto.absent_reason,
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absent_reason: true,
          employee: true,
        },
      });
      return updatedRecord;
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw new Error('Failed to update attendance record');
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
}
