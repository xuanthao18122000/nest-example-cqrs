import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type PositionsDocument = Position & Document;

@Schema({
  collection: "positions",
})
export class Position {
  _id: string;

  @Prop({
    type: String,
  })
  name: string;


  @Prop({
    required: true,
    default: 1,
    index: true,
  })
  status: string;


  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt: Date;

}

const PositionSchema = SchemaFactory.createForClass(Position);

PositionSchema.static(
  "findOneOrCreate",
  async function findOneOrCreate(condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
  },
);

export default PositionSchema;
