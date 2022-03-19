import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminMiddleware } from "./admin.middleware";
import { AdminModule } from "./admin/admin.module";
import { UserModule } from "./user/user.module";
import * as dotenv from "dotenv";
@Module({
  imports: [
    AuthModule,
    MongooseModule.forRoot(dotenv.config().parsed.MONGO_URL),
    AdminModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminMiddleware).forRoutes("/admin");
  }
}
