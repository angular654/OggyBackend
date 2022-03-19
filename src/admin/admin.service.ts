/* eslint-disable */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Test, TestDocument, TestSchema } from "src/schemas/test.schema";
import { LoadTestDto } from "./dto/load-test.dto";
import { UpdateTestDto } from "./dto/update-test.dto";
@Injectable()
export class AdminService {
    constructor(@InjectModel(Test.name) private testModel: Model<TestDocument>) {}

    createTest(loadedTest: LoadTestDto ):Promise<TestDocument> {
        const data = {
            title: loadedTest.title,
            questions: loadedTest.questions,
            time_lim: loadedTest.time_lim,
            answers: loadedTest.answers,
          };
          const newUser = new this.testModel(data);
          return newUser.save();
    }
    async getTests(limit: number) {
        return await this.testModel.find().limit(+limit);
    }
    async getTestById(id: string) {
        return await this.testModel.findById(id)
    }
    async update(id: string, loadedTest: UpdateTestDto) {
        await this.testModel.findByIdAndUpdate(id, loadedTest);
    }
    async remove(id: string) {
        await this.testModel.findByIdAndRemove(id);
    }
}
