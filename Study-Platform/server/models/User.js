const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(

  {

    name: {

      type: String,

      required: true,

      trim: true,

      minlength: 2,

      maxlength: 50,

    },

    email: {

      type: String,

      required: true,

      unique: true,

      lowercase: true,

      trim: true,

    },

    password: {

      type: String,

      required: true,

      minlength: 6,

    },

    profileImage: {

      type: String,

      default: "",

    },

    bio: {

      type: String,

      default: "",

      maxlength: 300,

      trim: true,

    },

    role: {

      type: String,

      enum: [
        "user",
        "admin",
      ],

      default: "user",

    },

  },

  {

    timestamps: true,

  }

);

module.exports = mongoose.model(
  "User",
  userSchema
);