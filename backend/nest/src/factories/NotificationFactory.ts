import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';
import { faker } from '@faker-js/faker';

export class NotificationFactory {
  static make(props?: Partial<NotificationProps>): Notification {
    return new Notification({
      recipientId: '60957d882b8e761e9860e9a5',
      content: faker.lorem.sentence(3),
      category: 'social',
      ...props,
    });
  }
}
