import INotificationDataDTO from '@modules/notifications/dtos/INotificationDataDTO';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

import { MongoRepository, getMongoRepository } from 'typeorm';

class NotificationsRepository implements INotificationsRepository {
  private ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    receiver_id,
    content
  }: INotificationDataDTO): Promise<Notification> {
    const notification = this.ormRepository.create({ receiver_id, content });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationsRepository;
