import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import * as bcrypt from "bcrypt";
import { USER_GENDER, USER_STATUS, USER_TYPE } from "src/common/constants/user.constant";

export type UsersDocument = User & Document;

@Schema({
  collection: "users",
})
export class User {
  _id: string;

  @Prop({
    type: String,
    index: true,
    default: "",
    trim: true,
  })
  email: string;

  @Prop({
    type: String,
    trim: true,
  })
  name: string;


//   @Prop({
//     type: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: Role.name,
//         // autopopulate: { select: ["name", "permissions"] },
//       },
//     ],
//   })
//   roles: Role;

  @Prop({
    type: String,
    default: "",
  })
  avatar: string;

  @Prop({
    type: String,
    trim: true,
  })
  refreshToken: string;

  @Prop({
    type: String,
    trim: true,
  })
  license: string;

  @Prop({
    type: String,
    required(): boolean {
      return this.userType === USER_TYPE.CMS;
    },
  })
  password: string;

  @Prop({ trim: true, type: String, default: "" })
  fullName: string;

  @Prop({ trim: true, index: true, type: String })
  phoneNumber: string;

  @Prop({
    required: true,
    enum: Object.values(USER_STATUS),
    default: USER_STATUS.ACTIVE,
    index: true,
  })
  status: string;

  @Prop({
    required: true,
    enum: Object.values(USER_TYPE),
    default: "USER",
    index: true,
  })
  userType: string;

  @Prop({ required: false, enum: Object.values(USER_GENDER)})
  gender: string;


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

const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    /**
     * auto hash password when isModified
     */
    const saltOrRounds = 10;
    this.password = await bcrypt.hash(this.password, saltOrRounds);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.static(
  "findOneOrCreate",
  async function findOneOrCreate(condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
  },
);

export default UserSchema;
