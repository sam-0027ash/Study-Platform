const jwt = require("jsonwebtoken");

const User = require("../models/User");

module.exports = async function (
  req,
  res,
  next
) {

  try {

    /* =========================
       GET TOKEN
    ========================= */

    const authHeader =
      req.header("Authorization");

    if (!authHeader) {

      return res.status(401).json({

        success: false,

        message:
          "Access denied. No token provided.",

      });

    }

    /* =========================
       REMOVE BEARER
    ========================= */

    const token =
      authHeader.startsWith("Bearer ")

        ? authHeader.split(" ")[1]

        : authHeader;

    /* =========================
       VERIFY TOKEN
    ========================= */

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    /* =========================
       GET LATEST USER
    ========================= */

    const user =
      await User.findById(
        decoded.id
      ).select("-password");

    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }

    /* =========================
       SAVE USER
    ========================= */

    req.user = user;

    next();

  } catch (error) {

    console.log(error);

    return res.status(401).json({

      success: false,

      message:
        "Invalid or expired token",

    });

  }

};