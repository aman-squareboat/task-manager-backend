import { registerAs } from '@nestjs/config';
import { MailmanOptions } from 'libs/mailman/src';

export default registerAs('notifications', () => {
  return {
    mailman: {
      host: process.env.MAIL_HOST,
      port: +process.env.MAIL_PORT,
      username: process.env.MAIL_USERNAME,
      password: process.env.MAIL_PASSWORD,
      from: process.env.MAIL_SENDER_ID,
      path: 'apps/notification-jobs/src/resources',
    } as MailmanOptions,
  };
});
