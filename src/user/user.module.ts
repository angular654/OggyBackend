/* eslint-disable */
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from "@nestjs/mongoose";
import { Test, TestSchema } from "src/schemas/test.schema";
import { User, UserSchema } from 'src/schemas/user.schema';
import { UserGateway } from './user.gateway';
@Module({
  controllers: [UserController],
  providers: [UserService, UserGateway],
  imports: [MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]), MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UserModule {}
