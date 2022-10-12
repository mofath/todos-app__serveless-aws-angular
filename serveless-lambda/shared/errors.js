'use strict';

class HttpError extends Error {
  constructor({ message, statusCode, error = '' }) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}


class BadRequestError extends HttpError {
  constructor(message = 'Bad request', error) {
    super({
      statusCode: 400,
      message,
      error
    });
  }
}


class InternalServerError extends HttpError {
  constructor(message = 'Internal server error', error) {
    super({
      message,
      statusCode: 500,
      error
    });
  }
}



module.exports = {
  HttpError,
  BadRequestError,
  InternalServerError
};