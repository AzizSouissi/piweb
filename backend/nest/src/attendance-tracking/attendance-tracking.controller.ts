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
  Query,
} from '@nestjs/common';
import { AttendanceTrackingService } from './attendance-tracking.service';
import { UpdateAttendanceTrackingDto } from './dto/update-attendance-tracking.dto';
import { AttendanceRecord, User } from '@prisma/client';
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
  @Get('/getUser/:id')
  find(@Param('id') id: string): Promise<User> {
    return this.attendanceTrackingService.find(id);
  }
  @Get('/users')
  findAllUsers(): Promise<User> {
    return this.attendanceTrackingService.findAllUsers();
  }

  @Put('/updateAttendance/:id')
  async updateAttendance(
    @Param('id') id: string,
    @Body() updateAttendanceTrackingDto: UpdateAttendanceTrackingDto,
  ): Promise<AttendanceRecord | any> {
    try {
      const updatedRecord = await this.prisma.attendanceRecord.update({
        where: { id: id },
        data: {
          date: updateAttendanceTrackingDto.date,
          shiftType: updateAttendanceTrackingDto.shiftType,
          status: updateAttendanceTrackingDto.status,
          absent_reason: updateAttendanceTrackingDto.absent_reason,
          userId: updateAttendanceTrackingDto.userId,
        },
        select: {
          id: true,
          date: true,
          shiftType: true,
          status: true,
          absent_reason: true,
          userId: true,
        },
      });
      return updatedRecord;
    } catch (error) {
      console.error('Error updating attendance record:', error);
      throw new Error('Failed to update attendance record');
    }
  }
  /*@Put('/updateEmployee/:id')
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

      // Remove the id property from updateEmployeeDto
      const { id: employeeId, ...updateData } = updateEmployeeDto;

      // Update employee
      const updatedEmployee = await this.prisma.employee.update({
        where: { id },
        data: updateData, // Pass only the fields that need to be updated
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
  }*/
  @Get('with-attendance')
  async findAllWithAttendance(): Promise<any[]> {
    return this.prisma.user.findMany({
      include: {
        attendanceRecord: true,
      },
    });
  }
  @Get(':month/:year')
  findUsersAttendance(
    @Param('month') month: number,
    @Param('year') year: number,
  ): Promise<any[]> {
    return this.attendanceTrackingService.findUsersAttendance(month, year);
  }
  @Get('/:userId')
  async getAttendanceByEmployeeIdAndDate(
    @Param('userId') userId: string,
    @Query('date') date: string,
  ): Promise<AttendanceRecord | null> {
    return this.attendanceTrackingService.getAttendanceByUserIdAndDate(
      userId,
      date,
    );
  }
}
