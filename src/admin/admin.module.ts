/* eslint-disable */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestSchema } from "src/schemas/test.schema";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
  controllers: [AdminController],
  providers: [AdminService],
  imports: [
    MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }])
  ]
})
export class AdminModule {}
