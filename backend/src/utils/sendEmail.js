const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs').promises;

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Email templates
const emailTemplates = {
  emailVerification: {
    subject: 'Verify Your Email - HealthCare+',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>HealthCare+</h1>
          </div>
          <div class="content">
            <h2>Welcome ${data.name}!</h2>
            <p>Thank you for registering with HealthCare+. Please verify your email address to complete your registration.</p>
            <p>Click the button below to verify your email:</p>
            <a href="${data.verificationUrl}" class="button">Verify Email</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${data.verificationUrl}</p>
            <p>This link will expire in 24 hours.</p>
            <p>If you didn't create an account with us, please ignore this email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  passwordReset: {
    subject: 'Password Reset - HealthCare+',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .warning { background: #fef2f2; border: 1px solid #fecaca; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>HealthCare+</h1>
          </div>
          <div class="content">
            <h2>Password Reset Request</h2>
            <p>Hello ${data.name},</p>
            <p>We received a request to reset your password. Click the button below to create a new password:</p>
            <a href="${data.resetUrl}" class="button">Reset Password</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${data.resetUrl}</p>
            <div class="warning">
              <p><strong>Important:</strong> This link will expire in 10 minutes for security reasons.</p>
            </div>
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  appointmentConfirmation: {
    subject: 'Appointment Confirmation - HealthCare+',
    html: (data) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Confirmation</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #10b981; color: white; padding: 20px; text-align: center; }
          .content { padding: 30px 20px; background: #f9f9f9; }
          .appointment-details { background: white; padding: 20px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>HealthCare+</h1>
          </div>
          <div class="content">
            <h2>Appointment Confirmed</h2>
            <p>Hello ${data.patientName},</p>
            <p>Your appointment has been confirmed. Here are the details:</p>
            <div class="appointment-details">
              <h3>Appointment Details</h3>
              <p><strong>Doctor:</strong> ${data.doctorName}</p>
              <p><strong>Specialty:</strong> ${data.specialty}</p>
              <p><strong>Date:</strong> ${data.date}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Type:</strong> ${data.type}</p>
              <p><strong>Location:</strong> ${data.location}</p>
            </div>
            <p>Please arrive 15 minutes early for in-person appointments.</p>
            <p>If you need to reschedule or cancel, please do so at least 24 hours in advance.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  }
};

// Send email function
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    // Get template
    const template = emailTemplates[options.template];
    if (!template) {
      throw new Error(`Email template '${options.template}' not found`);
    }

    // Prepare email options
    const mailOptions = {
      from: `HealthCare+ <${process.env.EMAIL_FROM}>`,
      to: options.email,
      subject: options.subject || template.subject,
      html: template.html(options.data || {})
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;