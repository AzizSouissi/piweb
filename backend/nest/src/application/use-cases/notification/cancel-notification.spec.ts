import { NotificationFactory } from '@test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import generate from 'bson-objectid';
import { NotificationNotFoundException } from './exceptions/notification-not-found';
import { CancelNotification } from './cancel-notification';

describe('Read Notification', () => {
  let repository: InMemoryNotificationsRepository;
  let instance: CancelNotification;

  beforeEach(() => {
    repository = new InMemoryNotificationsRepository();
    instance = new CancelNotification(repository);
  });

  it('should be able to cancel a notification', async () => {
    const notificationId = generate().toHexString();
    await repository.create(NotificationFactory.make({ id: notificationId }));

    await instance.execute({ notificationId });

    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0].canceledAt).toBeInstanceOf(Date);
  });

  it('should not be able to cancel a non-existing notification', async () => {
    const notificationId = generate().toHexString();

    expect(() => {
      return instance.execute({ notificationId });
    }).rejects.toThrow(NotificationNotFoundException);

    expect(repository.notifications).toHaveLength(0);
  });
});
