import {
  getModelForClass,
  modelOptions,
  prop,
  Severity,
} from "@typegoose/typegoose";
import { UserPlan } from "./user.types";

@modelOptions({
  schemaOptions: {
    timestamps: true,
    collection: "users",
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class User {
  @prop({
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 100,
  })
  public name!: string;

  @prop({
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,
    maxlength: 255,
  })
  public email!: string;

  @prop({
    required: true,
    minlength: 6,
  })
  public passwordHash!: string;

  @prop({
    required: true,
    enum: UserPlan,
    type: String,
    default: UserPlan.FREE,
  })
  public plan!: UserPlan;

  public createdAt?: Date;
  public updatedAt?: Date;
}

export const UserModel = getModelForClass(User);
