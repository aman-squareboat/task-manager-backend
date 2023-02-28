import { RestServer } from "@libs/boat";
import { AppModule } from "./module";

RestServer.make(AppModule, {
  addValidationContainer: true,
  port: 3000
})