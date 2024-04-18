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
import { Public } from '../auth/common/decorators/public.decorator';

import { PrismaService } from 'src/prisma/prisma.service';
import { AttendanceRecord, User } from '@prisma/client';
import { CreateAttendanceTrackingDto } from './dto/create-attendance-tracking.dto';
import { Cron, CronExpression } from '@nestjs/schedule';

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
    @Body() updateAttendanceTrackingDto: AttendanceRecord,
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
  @Get('/getUserByEmail/:email')
  getUserIdByEmail(@Param('email') email: string): Promise<String | any> {
    return this.prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
      },
    });
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
  @Cron(CronExpression.EVERY_10_SECONDS)
  async remindUsers() {
    const users = await this.findAllWithAttendance();
    console.log('bonjour'); // Fetch all users

    for (const user of users) {
      console.log(user.number);
      const todayAttendance =
        await this.attendanceTrackingService.getAttendanceByUserIdAndDate(
          user.id,
          new Date().toISOString().split('T')[0],
        );

      if (!todayAttendance) {
        const number = '+216' + user.number;
        const message =
          'Hey ' +
          user.firstname +
          "! It seems like you haven't logged your attendance for today yet. Could you please take a moment to do so?";
        console.log('asaa' + number);
        // User didn't create attendance today, send a reminder message
        this.sendReminderMessage(number);
      }
    }
  }
  private sendReminderMessage(number) {
    console.log('bonjour'); // Fetch all users

    // Download the helper library from https://www.twilio.com/docs/node/install
    // Find your Account SID and Auth Token at twilio.com/console
    // and set the environment variables. See http://twil.io/secure
    const accountSid = 'AC656429b580a8994d0cc560a9ae915228';
    const authToken = '1460ba8886e7e2fc6f57b9cd5dd55f8b';
    const client = require('twilio')(accountSid, authToken);
    client.messages
      .create({
        body: "Hey there! It seems like you haven't logged your attendance for today yet. Could you please take a moment to do so?",
        from: '+12512503383',
        to: number,
      })
      .then((message) => console.log(message.sid));
  }
}
