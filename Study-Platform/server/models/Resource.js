const mongoose = require("mongoose");

const resourceSchema =
  new mongoose.Schema(

    {

      title: {

        type: String,

        required: true,

        trim: true,

        minlength: 3,

        maxlength: 100,

      },

      subject: {

        type: String,

        required: true,

        trim: true,

        maxlength: 50,

      },

      description: {

        type: String,

        required: true,

        trim: true,

        maxlength: 1000,

      },

      file: {

        type: String,

        required: true,

      },

      fileType: {

        type: String,

        default: "",

      },

      fileSize: {

        type: Number,

        default: 0,

      },

      uploadedBy: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      downloads: {

        type: Number,

        default: 0,

      },

      downloadedBy: [

        {

          type:
            mongoose.Schema.Types.ObjectId,

          ref: "User",

        },

      ],

      likes: {

        type: Number,

        default: 0,

      },

      likedBy: [

        {

          type:
            mongoose.Schema.Types.ObjectId,

          ref: "User",

        },

      ],

      tags: [

        {

          type: String,

          trim: true,

          lowercase: true,

        },

      ],

      category: {

        type: String,

        enum: [

          "Notes",

          "Assignments",

          "Question Papers",

          "Lab Manuals",

          "Projects",

          "Other",

        ],

        default: "Other",

      },

      visibility: {

        type: String,

        enum: [
          "public",
          "private",
        ],

        default: "public",

      },

    },

    {

      timestamps: true,

    }

  );

module.exports = mongoose.model(
  "Resource",
  resourceSchema
);