import { Module } from '@nestjs/common';
import { PasswordresetController } from './passwordreset.controller';
import { PasswordresetService } from './passwordreset.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports :[
    MailerModule.forRoot({
      transport : {
        host : 'sandbox.smtp.mailtrap.io',
        port : 2525,
        auth : {
          user: "7fce47a3e71e8a",
          pass: "652faca00143cc"
        }
      }
    })
  ],
  controllers: [PasswordresetController],
  providers: [PasswordresetService]
})
export class PasswordresetModule {}
