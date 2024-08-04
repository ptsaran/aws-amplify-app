import type { S3Handler } from 'aws-lambda';

// import express, { Request, Response } from 'express';
// import bodyParser from 'body-parser';
// import axios, { AxiosRequestConfig, Method } from 'axios';

import nodemailer from 'nodemailer';



const emailConfig = {
    service: 'gmail',
    auth: {
      user: 'saran@tivonaglobal.com', // Your Gmail address
      pass: '#tocsFin@5148', // Your Gmail password or App Password if 2FA is enabled
    },
  };
  
  // Email details
  const mailOptions = {
    from: 'sarantocs@gmail.com', // Sender address
    to: 'recipient-email@example.com', // List of recipients
    subject: 'Test Email', // Subject line
    text: 'Hello, this is a test email sent from a TypeScript script!', // Plain text body
  };

export const handler: S3Handler = async (event) => {
  const objectKeys = event.Records.map((record) => record.s3.object.key);
  console.log(`Upload handler invoked for objects... [${objectKeys.join(', ')}]`);


  const transporter = nodemailer.createTransport(emailConfig);
  const info = await transporter.sendMail(mailOptions);
  console.log(info);

  try {
    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email: ' + error);
  }
};
