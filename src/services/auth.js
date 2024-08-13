import crypto from 'node:crypto';
import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Session } from '../models/session.js';
import { sendMail } from '../utils/sendMail.js';
import { ACCESS_TOKEN, REFRESH_TOKEN, SMTP } from '../constants/index.js';

async function registerUser(user) {
  const maybeUser = await User.findOne({ email: user.email });

  if (maybeUser !== null) {
    throw createHttpError(409, 'Email in use');
  }

  user.password = await bcrypt.hash(user.password, 10);

  return User.create(user);
}

async function loginUser(email, password) {
  const maybeUser = await User.findOne({ email });

  if (maybeUser === null) {
    throw createHttpError(404, 'User not found');
  }

  const isMatch = await bcrypt.compare(password, maybeUser.password);

  if (isMatch === false) {
    throw createHttpError(401, 'Unauthorize');
  }

  await Session.deleteOne({ userId: maybeUser._id });

  const accessToken = crypto.randomBytes(30).toString('base64');
  const refreshToken = crypto.randomBytes(30).toString('base64');

  return Session.create({
    userId: maybeUser._id,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN),
  });
}

async function refreshUserSession(sessionId, refreshToken) {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (session === null) {
    throw createHttpError(401, 'Session not found');
  }

  if (new Date() > new Date(session.refreshTokenValidUntil)) {
    throw createHttpError(401, 'Refresh token is expired');
  }

  await Session.deleteOne({ _id: session._id });

  return Session.create({
    userId: session.userId,
    accessToken: crypto.randomBytes(30).toString('base64'),
    refreshToken: crypto.randomBytes(30).toString('base64'),
    accessTokenValidUntil: new Date(Date.now() + ACCESS_TOKEN),
    refreshTokenValidUntil: new Date(Date.now() + REFRESH_TOKEN),
  });
}

function logoutUser(sessionId) {
    return Session.deleteOne({ _id: sessionId });
}
  
// async function requestResetEmail(email) {
//   const user = await User.findOne({ email });
   
//   if (user === null) {
//     throw createHttpError(404, 'User not found');
//   }

//   await sendMail({
//     from: SMTP.FROM_EMAIL,
//     to: email,
//     subject: 'Reset your password',
//     html: `To reset password click <a href="https://www.google.com/">here</a>`,
//   });
// };


async function requestResetEmail(email) {
  const user = await User.findOne({ email });
  
  if (user === null) {
    throw createHttpError(404, 'User not found');
  }

  try {
    const result = await sendMail({
      from: SMTP.FROM_EMAIL,
      to: email,
      subject: 'Reset your password',
      html: `To reset password click <a href="https://www.google.com/">here</a>`,
    });
    console.log('Email sent:', result);
  } catch (error) {
    console.error('Error sending email:', error);
    throw createHttpError(500, 'Failed to send email');
  }
};

  
export { registerUser, loginUser, logoutUser, refreshUserSession, requestResetEmail };