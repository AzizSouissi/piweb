import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { PasswordresetModule } from './passwordreset/passwordreset.module';
import { AttendanceTrackingModule } from './attendance-tracking/attendance-tracking.module';
import { HttpModule } from '@infra/http/http.module';
import { DatabaseModule } from '@infra/database/database.module';
@Module({
  imports: [
    AttendanceTrackingModule,
    AuthModule,
    PrismaModule,
    RolesModule,
    UsersModule,
    PasswordresetModule,
    HttpModule, DatabaseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
