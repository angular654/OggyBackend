/* eslint-disable */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
export type TestDocument = Test & Document;

@Schema()
export class Test {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    time_lim: Number;

    @Prop({ required: true, default: [] })
    questions: Array<any>;

    @Prop({ required: true, default: [] })
    answers: Array<any>;
}
export const TestSchema = SchemaFactory.createForClass(Test);
