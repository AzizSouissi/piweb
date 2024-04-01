import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from 'src/application/use-cases/cancel-notification';
import { UnreadNotification } from 'src/application/use-cases/unread-notification';
import { ReadNotification } from 'src/application/use-cases/read-notification';
import { GetRecipientNotifications } from 'src/application/use-cases/get-recipient-notifications';
import { CreateNotification } from 'src/application/use-cases/create-notification';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    CreateNotification,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
  ],
})
export class HttpModule {}
