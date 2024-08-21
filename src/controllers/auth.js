import { registerUser, loginUser, refreshUserSession, logoutUser, requestResetEmail, resetPassword } from '../services/auth.js';

async function registerUserController(req, res) {
  const user = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

async function loginUserController(req, res) {
  const { email, password } = req.body;
  const session = await loginUser(email, password);

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

async function refreshUserSessionController(req, res) {
  const session = await refreshUserSession(
    req.cookies.sessionId,
    req.cookies.refreshToken,
  );
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

async function logoutUserController(req, res) {
  if (req.cookies.sessionId) {
    await logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

async function requestResetEmailController(req, res) {
  await requestResetEmail(req.body.email);
  res.send({
    status: 200,
    message: 'Reset password email was successfully sent!',
    data: {},
  });
};

async function resetPasswordController(req, res) {
  const { password, token } = req.body;
  await resetPassword(password, token);
  res.send({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

export { registerUserController, loginUserController, refreshUserSessionController, logoutUserController, requestResetEmailController, resetPasswordController };