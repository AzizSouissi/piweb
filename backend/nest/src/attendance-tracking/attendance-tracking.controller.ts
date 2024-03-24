import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { AttendanceTrackingService } from './attendance-tracking.service';
import { UpdateAttendanceTrackingDto } from './dto/update-attendance-tracking.dto';
import { AttendanceRecord, Employee } from '@prisma/client';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';
import { PrismaService } from 'src/prisma.service';

@Controller('attendance-tracking')
export class AttendanceTrackingController {
  constructor(
    private readonly attendanceTrackingService: AttendanceTrackingService,
    private readonly prisma: PrismaService,
  ) {}

  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() createAttendanceTrackingDto: CreateAttendanceTrackingDto,
  ): Promise<AttendanceRecord> {
    return this.attendanceTrackingService.create(
      id,
      createAttendanceTrackingDto,
    );
  }

  @Get()
  findAll() {
    return this.attendanceTrackingService.findAll();
  }

  /*@Patch(':id')
  updateZ(
    @Param('id') id: string,
    @Body() updateAttendanceTrackingDto: UpdateAttendanceTrackingDto,
  ) {
    return this.attendanceTrackingService.update(
      id,
      updateAttendanceTrackingDto,
    );
  }*/

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.attendanceTrackingService.remove(id);
  }
  @Get('/getEmploye/:id')
  find(@Param('id') id: string): Promise<Employee> {
    return this.attendanceTrackingService.find(id);
  }
  @Get('/employers')
  findAllEmployees(): Promise<Employee> {
    return this.attendanceTrackingService.findAllEmployees();
  }

  @Put(':id')
  async updateAttendance(
    @Param('id') id: string,
    @Body() updateAttendanceDto: UpdateAttendanceTrackingDto,
  ): Promise<AttendanceRecord> {
    try {
      // Check if attendance record exists
      const attendanceRecord = await this.prisma.attendanceRecord.findUnique({
        where: { id },
        include: { employee: true },
      });
      if (!attendanceRecord) {
        throw new NotFoundException(
          `Attendance record with ID ${id} not found.`,
        );
      }

      // Update attendance record
      return await this.prisma.attendanceRecord.update({
        where: { id },
        data: updateAttendanceDto,
      });
    } catch (error) {
      throw new Error(`Failed to update attendance record: ${error.message}`);
    }
  }
  @Put('/updateEmployee/:id')
  async updateEmployeeAndAttendance(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Employee,
  ): Promise<Employee> {
    try {
      // Check if employee exists
      const existingEmployee = await this.prisma.employee.findUnique({
        where: { id },
        include: { attendanceRecord: true },
      });
      if (!existingEmployee) {
        throw new NotFoundException(`Employee with ID ${id} not found.`);
      }

      // Update employee
      const updatedEmployee = await this.prisma.employee.update({
        where: { id },
        data: updateEmployeeDto,
      });

      // Update attendance records associated with the employee
      const updatedAttendanceRecords: AttendanceRecord[] = [];
      for (const attendanceRecord of existingEmployee.attendanceRecord) {
        const updatedAttendanceRecord =
          await this.prisma.attendanceRecord.update({
            where: { id: attendanceRecord.id },
            data: { employeeId: updatedEmployee.id },
          });
        updatedAttendanceRecords.push(updatedAttendanceRecord);
      }

      return updatedEmployee;
    } catch (error) {
      throw new Error(
        `Failed to update employee and attendance records: ${error.message}`,
      );
    }
  }
  @Get('with-attendance')
  async findAllWithAttendance(): Promise<any[]> {
    return this.prisma.employee.findMany({
      include: {
        attendanceRecord: true,
      },
    });
  }
  @Get(':month/:year')
  findEmployeesAttendance(
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<any[]> {
    return this.attendanceTrackingService.findEmployeesAttendance(month, year);
  }
}
