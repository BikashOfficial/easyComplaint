const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Complain = require("../models/complain");
const { sendMail } = require('../utils/mailer');
const adminEmail = process.env.ADMIN_EMAIL;

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email }); // TODO: Replace with actual user lookup

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Prevent admin from logging in via user login
    if (user.isAdmin) {
      return res
        .status(403)
        .json({ message: "Admins cannot log in from the user portal." });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "130h" }
    );

    res.status(200).json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const registerUser = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User with this email already exists." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: savedUser._id, email: savedUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "130h" }
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
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const getProfile = async (req, res) => {
  try {
    return res.status(200).json({ user: req.user });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

const sendComplaint = async (req, res) => {
  try {
    const { title, discription, category, priority } = req.body;
    if (!title || !discription || !category || !priority) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create and save the complaint
    const newComplaint = new Complain({
      title,
      discription,
      category,
      priority,
      userId: req.user.userId,
      userEmail: req.user.email,
    });

    const savedComplaint = await newComplaint.save();


    // Send email to user confirming submission
    await sendMail({
      to: savedComplaint.userEmail,
      subject: 'Your Complaint Has Been Submitted',
      html: `
        <h3>Complaint Submitted Successfully</h3>
        <p>Dear User,</p>
        <p>Your complaint has been received and is being reviewed by the admin team.</p>
        <p><strong>Title:</strong> ${savedComplaint.title}</p>
        <p><strong>Category:</strong> ${savedComplaint.category}</p>
        <p><strong>Priority:</strong> ${savedComplaint.priority}</p>
        <p><strong>Description:</strong> ${savedComplaint.discription}</p>
        <p>Thank you for reaching out to us.</p>
      `,
    });

    return res.status(201).json({
      message: "Complaint sent successfully.",
      complaint: {
        id: savedComplaint.id,
        userId: savedComplaint.userId,
        userEmail: savedComplaint.userEmail,
        title: savedComplaint.title,
        discription: savedComplaint.discription,
        category: savedComplaint.category,
        priority: savedComplaint.priority,
        status: savedComplaint.status,
        dateSubmitted: savedComplaint.dateSubmitted,
      },
    });
  } catch (error) {
    console.error("Error sending complaint:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = {
  registerUser,
  userLogin,
  sendComplaint,
  getProfile,
};
