import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationDataDTO from '@modules/notifications/dtos/INotificationDataDTO';

export default interface INotificationsRepository {
  create(data: INotificationDataDTO): Promise<Notification>;
}
