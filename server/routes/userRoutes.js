const express = require("express");
const {
  userLogin,
  registerUser,
  sendComplaint,
  getProfile,
} = require("../controllers/userController");
const { checkUser } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userLogin);
router.get("/profile", checkUser, getProfile);
router.post("/complaint", checkUser, sendComplaint);

module.exports = router;
