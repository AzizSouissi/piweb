import { NotificationFactory } from './../../../../test/factories/NotificationFactory';
import { InMemoryNotificationsRepository } from './../../../../test/repositories/in-memory-notifications-repository';
import generate from 'bson-objectid';
import { NotificationNotFoundException } from './exceptions/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Read Notification', () => {
  let repository: InMemoryNotificationsRepository;
  let instance: UnreadNotification;

  beforeEach(() => {
    repository = new InMemoryNotificationsRepository();
    instance = new UnreadNotification(repository);
  });

  it('should be able to unread a notification', async () => {
    const notificationId = generate().toHexString();
    await repository.create(
      NotificationFactory.make({ id: notificationId, readAt: new Date() }),
    );

    await instance.execute({ notificationId });

    expect(repository.notifications).toHaveLength(1);
    expect(repository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non-existing notification', async () => {
    const notificationId = generate().toHexString();

    expect(() => {
      return instance.execute({ notificationId });
    }).rejects.toThrow(NotificationNotFoundException);

    expect(repository.notifications).toHaveLength(0);
  });
});
