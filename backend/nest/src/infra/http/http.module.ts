import { CancelNotification } from '@application/use-cases/notification/cancel-notification';
import { CreateNotification } from '@application/use-cases/notification/create-notification';
import { GetRecipientNotifications } from '@application/use-cases/notification/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/notification/read-notification';
import { UnreadNotification } from '@application/use-cases/notification/unread-notification';
import { CreateConfig } from '@application/use-cases/config/create-config';
import { GetConfig } from '@application/use-cases/config/get-config';
import { UpdateConfig } from '@application/use-cases/config/update-config';
import { DeleteConfig } from '@application/use-cases/config/delete-config';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { ConfigsController } from './controllers/configs.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController, ConfigsController],
  providers: [
    CreateNotification,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
    CancelNotification,
    CreateConfig,
    GetConfig,
    UpdateConfig,
    DeleteConfig,
  ],
})
export class HttpModule {}
