'use strict'

module.exports = {
    STATUS_CODE: {
      SUCCESS: 200,
      Created: 201,
      ERROR: 400,
      Unauthorized_user: 401,
      WRONG_MOVIE: 403,
      Not_found: 404,
      SERVER_ERROR: 500,
      SESSION_EXPIRE: 800
    },
    STATUS_MESSAGE: {
        TYPE_SUCCESS: 'Success',
        TYPE_ERROR: 'Error',
        SERVER_ERROR: "Something went wrong please try again after sometime.",
        ACCOUNT_CREATED: "Account created successfully",
        UNAUTHORIZED_USER: "Please enter correct email id and password!",
        LOGGED_IN: "Login Successfully!",
        LOGGED_OUT: "Logout Successfully!",
        MOVIE_ADDED: "Movie added successfully!",
        MOVIE_UPDATED: "Movie updated successfully!",
        MOVIE_DELETED: "Movie deleted successfully!",
        MOVIES: "Movies!",
        WRONG_MOVIE: "Please select a correct movie!",
        INVALID_SESSION_ID: 'Invalid Session ID',
        SESSION_EXPIRED: 'Session Expired',
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