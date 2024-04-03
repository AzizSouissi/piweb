import { CancelNotification } from '@application/use-cases/notification/cancel-notification';
import { CreateNotification } from '@application/use-cases/notification/create-notification';
import { GetRecipientNotifications } from '@application/use-cases/notification/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/notification/read-notification';
import { UnreadNotification } from '@application/use-cases/notification/unread-notification';
import { CreateConfig } from '@application/use-cases/config/create-config';
import { GetConfig } from '@application/use-cases/config/get-config';
import { UpdateConfig } from '@application/use-cases/config/update-config';
import { DeleteConfig } from '@application/use-cases/config/delete-config';
import { CreateAllowance } from '@application/use-cases/allowance/create-allowance';
import { UpdateAllowance } from '@application/use-cases/allowance/update-allowance';
import { DeleteAllowance } from '@application/use-cases/allowance/delete-allowance';
import { DatabaseModule } from '@infra/database/database.module';
import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { ConfigsController } from './controllers/configs.controller';
import { AllowancesController } from './controllers/allowances.controller';
import { FindAllByPayrollIdAllowance } from '@application/use-cases/allowance/findallbypayrollid-allowance';
import { FindByIdAllowance } from '@application/use-cases/allowance/findbyid-allowance';
import { CreateDeduction } from '@application/use-cases/deduction/create-deduction';
import { FindAllByPayrollIdDeduction } from '@application/use-cases/deduction/findallbypayrollid-deduction';
import { FindByIdDeduction } from '@application/use-cases/deduction/findbyid-deduction';
import { UpdateDeduction } from '@application/use-cases/deduction/update-deduction';
import { DeleteDeduction } from '@application/use-cases/deduction/delete-deduction';

@Module({
  imports: [DatabaseModule],
  controllers: [
    NotificationsController,
    ConfigsController,
    AllowancesController,
  ],
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
    CreateAllowance,
    FindAllByPayrollIdAllowance,
    FindByIdAllowance,
    UpdateAllowance,
    DeleteAllowance,
    CreateDeduction,
    FindAllByPayrollIdDeduction,
    FindByIdDeduction,
    UpdateDeduction,
    DeleteDeduction,
  ],
})
export class HttpModule {}
