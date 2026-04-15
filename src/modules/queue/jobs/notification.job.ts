export interface NotificationJobData {
  notificationId: string;
  projectId: string;
  channel: string; 
  toEmail?: string;
  data: Record<string, any>;
  templateName?: string;
}
