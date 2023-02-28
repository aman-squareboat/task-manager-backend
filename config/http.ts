import { registerAs } from '@nestjs/config';

export default registerAs('http', () => ({
  timeout: process.env.HTTP_TIMEOUT || 5000,
  maxRedirects: process.env.MAX_HTTP_REDIRECTS || 5,
}));
