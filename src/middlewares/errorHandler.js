import { isHttpError } from 'http-errors';

function errorHandler(error, req, res, _next) {

  console.log('Error', error);

  if (isHttpError(error) === true) {
    return res.status(error.status).send({
      status: error.status,
      message: error.message,
    });
  }

  res.status(500).send({
    status: 500,
    message: 'Something went wrong',
  });
}

export { errorHandler };