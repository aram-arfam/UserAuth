// transporter.js (Corrected using environment variables)
import nodemailer from "nodemailer";
import dotenv from 'dotenv'; // Make sure dotenv is configured early in your app

dotenv.config(); // Load .env variables

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  auth: {
    // Use the correct SMTP login user from .env
    user: process.env.STMP_USER,
    // Use the SMTP password/API key from .env
    pass: process.env.STMP_PASS,
  },
});

export default transporter;