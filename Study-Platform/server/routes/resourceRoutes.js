const express = require("express");

const multer = require("multer");

const {
  CloudinaryStorage,
} = require(
  "multer-storage-cloudinary"
);

const cloudinary = require(
  "../config/cloudinary"
);

const router = express.Router();

const Resource = require("../models/Resource");

const authMiddleware =
  require("../middleware/authMiddleware");

const adminMiddleware =
  require("../middleware/adminMiddleware");

/* =========================
   CLOUDINARY STORAGE
========================= */

const storage =
  new CloudinaryStorage({

    cloudinary,

    params: async (
      req,
      file
    ) => {

      /* KEEP EVERYTHING AS RAW */
      let resourceType = "raw";

      /* IMAGES SHOULD STAY IMAGE */
      if (

        file.mimetype ===
          "image/png" ||

        file.mimetype ===
          "image/jpeg" ||

        file.mimetype ===
          "image/jpg"

      ) {

        resourceType = "image";

      }

      return {

        folder:
          "studyshare-resources",

        resource_type:
          resourceType,

        use_filename: true,

        unique_filename: true,

        public_id:
          Date.now() +
          "-" +
          file.originalname
            .replace(/\s+/g, "-")
            .replace(/\.pdf$/i, "")
            .replace(/\.doc$/i, "")
            .replace(/\.docx$/i, ""),

      };

    },

  });

/* =========================
   FILE FILTER
========================= */

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [

    "application/pdf",

    "application/msword",

    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    "image/png",

    "image/jpeg",

    "image/jpg",

  ];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(

      new Error(
        "Only PDF, DOC, DOCX, PNG, JPG files are allowed"
      ),

      false

    );

  }

};

const upload = multer({

  storage,

  fileFilter,

  limits: {

    fileSize:
      10 * 1024 * 1024,

  },

});

/* =========================
   UPLOAD RESOURCE
========================= */

router.post(

  "/upload",

  authMiddleware,

  upload.single("file"),

  async (req, res) => {

    try {

      const {

        title,
        subject,
        description,
        visibility,
        tags,

      } = req.body;

      if (
        !title ||
        !subject ||
        !description
      ) {

        return res.status(400).json({

          message:
            "All fields are required",

        });

      }

      if (!req.file) {

        return res.status(400).json({

          message:
            "File is required",

        });

      }

      let fileUrl =
        req.file.path;

      /* PDF PREVIEW URL */
      if (
        req.file.mimetype ===
        "application/pdf"
      ) {

        fileUrl =
          `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
            req.file.path
          )}`;

      }

      const resource =
        new Resource({

          title,

          subject,

          description,

          file:
            fileUrl,

          originalFile:
            req.file.path,

          fileType:
            req.file.mimetype,

          fileSize:
            req.file.size,

          uploadedBy:
            req.user.id,

          visibility:
            visibility ||
            "public",

          tags: tags

            ? tags
                .split(",")
                .map((tag) =>
                  tag.trim()
                )

            : [],

        });

      await resource.save();

      const populatedResource =
        await Resource.findById(
          resource._id
        ).populate(
          "uploadedBy",
          "name email profileImage"
        );

      res.status(201).json({

        success: true,

        message:
          "Resource uploaded successfully",

        resource:
          populatedResource,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Upload failed",

      });

    }

  }

);

/* =========================
   GET DOWNLOAD HISTORY
========================= */

router.get(

  "/downloads/history",

  authMiddleware,

  async (req, res) => {

    try {

      const resources =
        await Resource.find({

          downloadedBy:
            req.user.id,

        })

          .populate(
            "uploadedBy",
            "name email profileImage"
          )

          .sort({

            updatedAt: -1,

          });

      res.status(200).json(
        resources
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch history",

      });

    }

  }

);

/* =========================
   GET ALL RESOURCES
========================= */

router.get(

  "/",

  async (req, res) => {

    try {

      const resources =
        await Resource.find({

          visibility:
            "public",

        })

          .populate(
            "uploadedBy",
            "name email profileImage"
          )

          .sort({

            createdAt: -1,

          });

      res.status(200).json(
        resources
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch resources",

      });

    }

  }

);

/* =========================
   MY UPLOADS
========================= */

router.get(

  "/my-uploads",

  authMiddleware,

  async (req, res) => {

    try {

      const resources =
        await Resource.find({

          uploadedBy:
            req.user.id,

        })

          .populate(
            "uploadedBy",
            "name email profileImage"
          )

          .sort({

            createdAt: -1,

          });

      res.status(200).json(
        resources
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch uploads",

      });

    }

  }

);

/* =========================
   DOWNLOAD RESOURCE
========================= */

router.put(

  "/download/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({

          message:
            "Resource not found",

        });

      }

      resource.downloads += 1;

      if (
        !resource.downloadedBy.includes(
          req.user.id
        )
      ) {

        resource.downloadedBy.push(
          req.user.id
        );

      }

      await resource.save();

      res.status(200).json({

        success: true,

        message:
          "Download tracked successfully",

        file:
          resource.file,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to track download",

      });

    }

  }

);

/* =========================
   GET SINGLE RESOURCE
========================= */

router.get(

  "/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({

          message:
            "Resource not found",

        });

      }

      res.status(200).json(
        resource
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to fetch resource",

      });

    }

  }

);

/* =========================
   UPDATE RESOURCE
========================= */

router.put(

  "/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const {

        title,
        description,
        subject,

      } = req.body;

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({

          message:
            "Resource not found",

        });

      }

      if (

        resource.uploadedBy.toString() !==
        req.user.id

      ) {

        return res.status(403).json({

          message:
            "Not authorized",

        });

      }

      resource.title =
        title ||
        resource.title;

      resource.description =
        description ||
        resource.description;

      resource.subject =
        subject ||
        resource.subject;

      await resource.save();

      res.status(200).json({

        success: true,

        message:
          "Resource updated successfully",

        resource,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Update failed",

      });

    }

  }

);

/* =========================
   DELETE RESOURCE
========================= */

router.delete(

  "/:id",

  authMiddleware,

  async (req, res) => {

    try {

      const resource =
        await Resource.findById(
          req.params.id
        );

      if (!resource) {

        return res.status(404).json({

          message:
            "Resource not found",

        });

      }

      const isOwner =

        resource.uploadedBy.toString() ===
        req.user.id;

      const isAdmin =
        req.user.role ===
        "admin";

      if (
        !isOwner &&
        !isAdmin
      ) {

        return res.status(403).json({

          message:
            "Unauthorized action",

        });

      }

      await resource.deleteOne();

      res.status(200).json({

        success: true,

        message:
          "Resource deleted successfully",

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        message:
          "Failed to delete resource",

      });

    }

  }

);

module.exports = router;