import { timeStamp } from "console";
import { model, Schema } from "mongoose";
import { userSubscription } from "./userSubscription";

const UserSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
    },
    avatarURL: {
      type: String,
      required: true,
    },
    subscription: {
      type: String,
      enum: [...userSubscription],
      default: userSubscription[0],
    },
    token: {
      type: String,
      default: null,
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const modelUser = model("user", UserSchema);

export default modelUser;
