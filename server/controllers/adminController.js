const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Complain = require("../models/complain");
const { sendMail } = require("../utils/mailer");

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Prevent non-admins from logging in via admin login
    if (!user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Only admins can log in from the admin portal." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, isAdmin: true },
      process.env.JWT_SECRET,
      { expiresIn: "140h" }
    );

    res.status(200).json({
      token,
      admin: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        isAdmin: true,
      },
    });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password, companyCode } = req.body;

    if (!fullName || !email || !password || !companyCode) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    if (companyCode == process.env.ORGANIZATION_CODE) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        isAdmin: true,
      });

      const savedUser = await newUser.save();

      // Generate JWT token
      const token = jwt.sign(
        { userId: savedUser._id, email: savedUser.email, isAdmin: true },
        process.env.JWT_SECRET,
        { expiresIn: "140h" }
      );

      res.status(201).json({
        message: "User registered successfully.",
        token,
        user: {
          id: savedUser._id,
          fullName: savedUser.fullName,
          email: savedUser.email,
        },
      });
    } else {
      return res
        .status(500)
        .json({ message: "Sorry, wrong Organization Code" });
    }
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getProfile = async (req, res) => {
  try {
    return res.status(200).json({ admin: req.user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getDashBoard = async (req, res) => {
  try {
    // Get filter params from query
    const { status, priority } = req.query;
    // Build filter object
    let filter = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    // Get total complaint count (unfiltered)
    const totalCount = await Complain.countDocuments();
    // Get count for each status (unfiltered)
    const pendingCount = await Complain.countDocuments({ status: "Pending" });
    const inProgressCount = await Complain.countDocuments({
      status: "In Progress",
    });
    const resolvedCount = await Complain.countDocuments({ status: "Resolved" });
    // Get filtered complaints with details
    const complaints = await Complain.find(filter).populate(
      "userId",
      "fullName email"
    );
    res.status(200).json({
      totalCount,
      statusCounts: {
        Pending: pendingCount,
        "In Progress": inProgressCount,
        Resolved: resolvedCount,
      },
      complaints, // filtered complaints
      filterUsed: filter, // for debugging/confirmation
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status || !["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid or missing status." });
    }
    const updated = await Complain.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Complaint not found." });
    }

    // Send email to admin on status update

    const adminEmail = process.env.ADMIN_EMAIL;
    await sendMail({
      to: adminEmail,
      subject: "Complaint Status Updated",
      html: `
        <h3>Complaint Status Updated</h3>
        <p><strong>Title:</strong> ${updated.title}</p>
        <p><strong>New Status:</strong> ${updated.status}</p>
        <p><strong>Date Updated:</strong> ${new Date().toLocaleString()}</p>
      `,
    });

    res
      .status(200)
      .json({ message: "Status updated successfully.", complaint: updated });
  } catch (error) {
    console.error("Error updating complaint status:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const deleteComplaint = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Complain.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found." });
    }
    res.status(200).json({ message: "Complaint deleted successfully." });
  } catch (error) {
    console.error("Error deleting complaint:", error.message);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  adminLogin,
  registerAdmin,
  getDashBoard,
  updateStatus,
  deleteComplaint,
  getProfile,
};
