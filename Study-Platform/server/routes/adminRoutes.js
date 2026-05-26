const express = require("express");

const router = express.Router();

const User = require("../models/User");

const Resource = require("../models/Resource");

const authMiddleware = require("../middleware/authMiddleware");

const adminMiddleware = require("../middleware/adminMiddleware");

/* =========================
   GET ADMIN STATS
========================= */

router.get(
  "/stats",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const totalUsers =
        await User.countDocuments();

      const totalResources =
        await Resource.countDocuments();

      const resources =
        await Resource.find();

      let totalDownloads = 0;

      resources.forEach((resource) => {

        totalDownloads +=
          resource.downloads || 0;

      });

      res.status(200).json({
        totalUsers,
        totalResources,
        totalDownloads,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch stats",
      });

    }

  }
);

/* =========================
   GET ALL USERS
========================= */

router.get(
  "/users",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password")
          .sort({
            createdAt: -1,
          });

      res.status(200).json(users);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Failed to fetch users",
      });

    }

  }
);

/* =========================
   GET ALL RESOURCES
========================= */

router.get(
  "/resources",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      const resources =
        await Resource.find()
          .populate(
            "uploadedBy",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      res.status(200).json(resources);

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
   DELETE USER
========================= */

router.delete(
  "/user/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.status(200).json({
        success: true,
        message:
          "User deleted",
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          "Delete failed",
      });

    }

  }
);

module.exports = router;