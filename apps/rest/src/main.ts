import { RestServer } from '@libs/boat';
import { AppModule } from './module';

RestServer.make(AppModule, {
  addValidationContainer: true,
  port: +process.env.APP_PORT,
});
