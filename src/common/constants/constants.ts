
// Notification Channels
export enum ChannelType {
  EMAIL = 'email',
  SMS = 'sms',
  PUSH = 'push',
  WEBHOOK = 'webhook',
}

export enum NotificationStatus {
  QUEUED = 'queued',
  PROCESSING = 'processing',
  SENT = 'sent',
  DELIVERED = 'delivered',
  OPENED = 'opened',                    // Mainly for email
  FAILED = 'failed',
  PERMANENTLY_FAILED = 'permanently_failed',
  CANCELLED = 'cancelled',              // For scheduled notifications
}

// Delivery Log Status (Per attempt status)
export enum DeliveryStatus {
  SENT = 'sent',
  DELIVERED = 'delivered',
  OPENED = 'opened',
  FAILED = 'failed',
  UNDELIVERED = 'undelivered',          
}

// Webhook Event Types (for client webhooks)
export enum WebhookEventType {
  NOTIFICATION_QUEUED = 'notification.queued',
  NOTIFICATION_PROCESSING = 'notification.processing',
  NOTIFICATION_SENT = 'notification.sent',
  NOTIFICATION_DELIVERED = 'notification.delivered',
  NOTIFICATION_OPENED = 'notification.opened',
  NOTIFICATION_FAILED = 'notification.failed',
  NOTIFICATION_PERMANENTLY_FAILED = 'notification.permanently_failed',
}

