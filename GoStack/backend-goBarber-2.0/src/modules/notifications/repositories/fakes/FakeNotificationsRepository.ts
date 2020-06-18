import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import INotificationDataDTO from '@modules/notifications/dtos/INotificationDataDTO';
import { uuid } from 'uuidv4';
import { ObjectID } from 'mongodb';

class FakeNotificationsRepository implements INotificationsRepository {
  private notifications: Notification[] = [];

  public async create({
    receiver_id,
    content
  }: INotificationDataDTO): Promise<Notification> {
    const notification = new Notification();

    Object.assign(notification, { id: new ObjectID(), receiver_id, content });

    this.notifications.push(notification);

    return notification;
  }
}

export default FakeNotificationsRepository;
