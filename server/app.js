require("dotenv").config();
const express = require("express");
const connectToDb = require("./db/db.js");
const userRoutes = require("./routes/userRoutes.js");
const adminRoutes = require("./routes/adminRoutes.js");
const cors = require("cors");
const { sendMail } = require('./utils/mailer');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 5000;

connectToDb();

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.get('/test-email', async (req, res) => {
  try {
    const info = await sendMail({
      to: process.env.ADMIN_EMAIL,
      subject: 'Test Email from Nodemailer',
      html: '<h3>This is a test email from your Node.js app.</h3>'
    });
    res.status(200).json({ message: 'Test email sent!', info });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send test email', error: err.message });
  }
});

app.listen(port, () => {
  console.log(`running on port ${port}`);
});
