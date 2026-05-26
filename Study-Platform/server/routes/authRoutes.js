const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const multer = require("multer");

const path = require("path");

const fs = require("fs");

const User = require("../models/User");

const authMiddleware = require("../middleware/authMiddleware");

/* =========================
   CREATE UPLOADS FOLDER
========================= */

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

/* =========================
   MULTER STORAGE
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

/* =========================
   FILE FILTER
========================= */

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, PNG, and WEBP images are allowed"
      ),
      false
    );
  }
};

const upload = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

/* =========================
   SIGNUP
========================= */

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    /* VALIDATION */
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    /* CHECK USER */
    const existingUser =
      await User.findOne({
        email,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    /* HASH PASSWORD */
    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    /* CREATE USER */
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    /* CREATE TOKEN */
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      success: true,

      message:
        "Signup successful",

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        bio: user.bio,

        role: user.role,

        profileImage:
          user.profileImage,

        createdAt:
          user.createdAt,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =========================
   LOGIN
========================= */

router.post("/login", async (req, res) => {
  try {
    const { email, password } =
      req.body;

    /* FIND USER */
    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    /* CHECK PASSWORD */
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid credentials",
      });
    }

    /* CREATE TOKEN */
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,

      token,

      user: {
        id: user._id,

        name: user.name,

        email: user.email,

        bio: user.bio,

        role: user.role,

        profileImage:
          user.profileImage,

        createdAt:
          user.createdAt,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

/* =========================
   GET PROFILE
========================= */

router.get(
  "/profile",
  authMiddleware,
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user.id
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      res.status(200).json(user);
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Failed to fetch profile",
      });
    }
  }
);

/* =========================
   UPDATE PROFILE
========================= */

router.put(
  "/profile",
  authMiddleware,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      const {
        name,
        email,
        bio,
      } = req.body;

      const user =
        await User.findById(
          req.user.id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      /* CHECK EMAIL EXISTS */
      if (
        email &&
        email !== user.email
      ) {
        const existingEmail =
          await User.findOne({
            email,
          });

        if (existingEmail) {
          return res.status(400).json({
            success: false,
            message:
              "Email already in use",
          });
        }
      }

      /* UPDATE FIELDS */
      user.name =
        name || user.name;

      user.email =
        email || user.email;

      user.bio =
        bio || user.bio;

      /* PROFILE IMAGE */
      if (req.file) {
        user.profileImage =
          req.file.path;
      }

      await user.save();

      res.status(200).json({
        success: true,

        message:
          "Profile updated successfully",

        user: {
          id: user._id,

          name: user.name,

          email: user.email,

          bio: user.bio,

          role: user.role,

          profileImage:
            user.profileImage,

          createdAt:
            user.createdAt,
        },
      });
    } catch (error) {
      console.log(error);

      res.status(500).json({
        success: false,
        message:
          "Profile update failed",
      });
    }
  }
);

module.exports = router;