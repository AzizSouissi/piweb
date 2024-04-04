export class CreateNotificationDto {
  recipientId: string;
  content: string;
  category: string;
  readAt?: Date;
  canceledAt?: Date;
}
