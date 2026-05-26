const User = require("../models/User");

const adminMiddleware = async (
  req,
  res,
  next
) => {

  try {

    /* CHECK USER */
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

    /* CHECK ADMIN ROLE */
    if (
      user.role !== "admin"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Access denied. Admin only.",

      });

    }

    /* ALLOW ACCESS */
    next();

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "Server error",

    });

  }

};

module.exports =
  adminMiddleware;