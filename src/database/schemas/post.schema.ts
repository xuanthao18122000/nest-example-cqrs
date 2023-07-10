import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import * as bcrypt from "bcrypt";

export type PostsDocument = Post & Document;

@Schema({
  collection: "posts",
})
export class Post {
  _id: string;

  @Prop({
    type: String,
  })
  name: string;

  @Prop({
    required: true,
    type: Number,
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

const PostSchema = SchemaFactory.createForClass(Post);

export default PostSchema;
