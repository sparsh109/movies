# movies
# Description
    User can registration/login/logut or add/update/delete/view the movies functionality
# Requirements
    1. PostgreSQL DB
    2. Node.Js
    3. NPM
    4. Redis
# env
    #==========PROJECT CONFIG========
    PORT=7000
    NODE_ENV=localhost
    GUEST_SECRET=2134567890dfcgvhbjAzsxdfcghvjbkEzrxdfcghj

    #==========DB CONFIG=============
    DB_HOST=localhost
    DB_NAME=
    DB_USER=
    DB_PASSWORD=

    #==========REDIS CONFIG===========
    REDIS_HOST=localhost
    REDIS_PORT=6379
# POSTMAN URL
    https://api.postman.com/collections/16867262-4029f895-cadb-4b19-ac03-3f5d93de8454?access_key=PMAT-01HEYSR0A10TGRV3AMEFD700XA
# DB Queries
    1. Movies Table
        CREATE TABLE movies (
            movieId BIGSERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            rating VARCHAR(255) NOT NULL,
            castMembers VARCHAR(255)[] NOT NULL,
            genre VARCHAR(255) NOT NULL,
            releaseDate TIMESTAMPTZ NOT NULL,
            addedBy BIGINT NOT NULL,
            status SMALLINT DEFAULT 1 NOT NULL,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
        );
    2. User Table
        CREATE TABLE users (
            userId BIGSERIAL PRIMARY KEY,
            email VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL,
            jwtToken VARCHAR(255) NOT NULL,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
        );


# Start your project by installing project dependencies 
    Command:- npm i
# Project run command
    Command:- npm run dev
# Folder structure
    {COMMON (index.js) => This file require same folder file and export them}
    1. server.js = To start project. Start express server. Project entry file.
    2. env = This file have all environment variable values.
    3. routes = This folder has file related to express routing.
        => Movies.js -> This file has express routes related to movies.
        => Users.js -> This file has express routes related to users.
    4. src = This folder has other file related to run project.
        => config -> This folder has project configuration.
            => config.js -> It has config variable.
            => DBConnection.js => PostgreSQL DB connection.
            => RedisConnection => Redis connection.

        => constants
            => statusConstants.js -> This file has constant value of the project.

        => controller
            => Movies.js -> It has all business logic related to movies like add/update/delete/get.
            => Users.js -> It has all business logic related to user like login/logout/signup.

        => dbqueries.js
            => Movies.js -> It has all db queries to perform user performed action and update data in db related to movies. 
            => Users.js -> It has all db queries to perform user performed action and update data in db related to user. 

        => helper
            => Logger.js => To create project logs like error/info/debug.
            => Response.js => Common file to send response of user request.

        => middleware
            => CheckToken.js => To validate user or it' session.
            => Movies.js => To validate movies request and modify them according to our need.
            => Users.js => To validate users request and modify them according to our need.

        => models
            => Movies.js => Movies db schema.
            => Users.js => Users db schema. 
    

