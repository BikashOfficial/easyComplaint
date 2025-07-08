const express = require("express");
const {
  adminLogin,
  registerAdmin,
  getDashBoard,
  updateStatus,
  deleteComplaint,
  getProfile,
} = require("../controllers/adminController");
const { checkAdmin } = require("../middlewares/auth");

const router = express.Router();

router.post("/login", adminLogin);
router.post("/register", registerAdmin);
router.get("/profile", checkAdmin, getProfile);
router.get("/dashboard", checkAdmin, getDashBoard);
router.put("/complaint/:id", checkAdmin, updateStatus);
router.delete("/complaint/:id", checkAdmin, deleteComplaint);

module.exports = router;
