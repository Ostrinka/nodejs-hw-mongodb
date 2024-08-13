import nodemailer from 'nodemailer';

import { SMTP } from '../constants/index.js';

console.log('SMTP Host:', SMTP.HOST);
console.log('SMTP Port:', SMTP.PORT);
console.log('SMTP User:', SMTP.USER);
console.log('SMTP Password:', SMTP.PASSWORD);

const transport = nodemailer.createTransport({
  host: SMTP.HOST,
  port: Number(SMTP.PORT),
  secure: false,
  auth: {
    user: SMTP.USER,
    pass: SMTP.PASSWORD,
  },
});

export function sendMail(options) {
  return transport.sendMail(options);
}



