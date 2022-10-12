'use strict';

const { HttpError } = require('./errors');

/**
 * 
 * @param {Object} body 
 * @param {String} functionName 
 * @returns 
 */
module.exports.build_success = function (body, functionName) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      ...body,
      functionName
    })
  };
}

/**
 * 
 * @param {HttpError} error 
 * @param {String} functionName 
 * @returns Object - http response for failed requests.
 */
module.exports.build_fail = function (error, functionName) {
  if (error instanceof HttpError) {

    return {
      statusCode: 500,
      body: JSON.stringify({
        functionName,
        message: error.message,
        error: error.error
      })
    };

  } else {

    return {
      statusCode: 500,
      body: JSON.stringify({
        functionName,
        message: 'Internal Server Error',
        error: ''
      })
    };
  }

}