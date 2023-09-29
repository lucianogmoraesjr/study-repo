import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'Category Test',
    content: new Content('Content Test'),
    recipientId: 'recipient-1',
    ...override,
  });
}
