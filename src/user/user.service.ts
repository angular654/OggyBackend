/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Test, TestDocument } from 'src/schemas/test.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>, @InjectModel(User.name) private userModel: Model<UserDocument>){}

    async getTestById(id: string) {
        return await this.testModel.findById(id)
    }
    async updateTestHistory(test: any, id: string) {
        return await this.userModel.findByIdAndUpdate(id, {$push: { done_tests: test }} );
    }
}
