import mongoose from "mongoose";
import jwt from "json-web-token";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    phoneno: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required !!!"],
      minlength: 8,
      trim: true,
      index: true,
    },

    watchhistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vedio",
      },
    ],
    refreshtoken: {
      type: String,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
    },
    profile: {
      bio: {
        type: String,
      },
      skills: [
        {
          type: String,
        },
      ],
      resume: {
        type: String, //cloudnary url
      },
      resumeOriginalName: {
        type: String,
      },
      profilePhoto: {
        type: String, //cloudnary url
        default: "",
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    return (this.password = bcrypt.hash(this.password, 10));
  }
  next();
});
userSchema.method.isPasswordCorect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.method.genrateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      password: this.password,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.method.genrateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("USer", userSchema);
