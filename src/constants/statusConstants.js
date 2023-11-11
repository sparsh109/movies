'use strict'

module.exports = {
    STATUS_CODE: {
      SUCCESS: 200,
      Created: 201,
      ERROR: 400,
      Unauthorized_user: 401,
      FORBIDDEN: 403,
      Not_found: 404,
      SERVER_ERROR: 500,
      Bad_GateWay: 502,
      SESSION_EXPIRE: 800
    },
    STATUS_MESSAGE: {
        TYPE_SUCCESS: 'Success',
        TYPE_ERROR: 'Error',
        SERVER_ERROR: "Something went wrong please try again after sometime.",
        EMAIL_ALREADY_EXIST_INFO: 'Email Is Already Exist',
        ACCOUNT_CREATED: "Account created successfully",
        UNAUTHORIZED_USER: "Please enter correct email id and password!",
        LOGGED_IN: "Login Successfully!",
        LOGGED_OUT: "Logout Successfully!",
        MOVIE_ADDED: "Movie added successfully!",
        MOVIE_UPDATED: "Movie updated successfully!",
        MOVIE_DELETED: "Movie deleted successfully!",
        MOVIES: "Movies!",
        REQUEST_INCOMPLETE: 'Request Incomplete',
        INVALID_USER_ID: 'UserId Invalid',
        INVALID_EMAIL: 'INVALID_EMAIL',
        INVALID_SESSION_ID: 'Invalid Session ID',
        SESSION_EXPIRED: 'Session Expired',
        IN_VALID_REQUEST: "In Valid Request",
      },
      MOVIE_STATUS:{
        ACTIVE: 1,
        INACTIVE: 2,
        DELETED: 0,
      },
      TOKEN_EXPIRY: {
        JWT: '50d',
        REDIS: 50 * 24 * 60 * 60,
      }
}