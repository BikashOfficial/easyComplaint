const nodemailer = require('nodemailer');

const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;

if (!emailUser || !emailPass) {
  console.error('ERROR: EMAIL_USER or EMAIL_PASS environment variables are missing!');
}

let transporter;
try {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });
} catch (err) {
  console.error('Failed to create Nodemailer transporter:', err);
}

async function sendMail({ to, subject, html }) {
  if (!transporter) {
    throw new Error('Nodemailer transporter is not initialized.');
  }
  try {
    return await transporter.sendMail({
      from: emailUser,
      to,
      subject,
      html,
    });
  } catch (err) {
    console.error('Error sending email:', err);
    throw err;
  }
}

module.exports = { sendMail };
