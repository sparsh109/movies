# movies
# Description
    User can registration/login/logut or add/update/delete/view the movies functionality
# Requirements
    1. PostgreSQL DB(Sequelize ORM)
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

    {"collection":{"info":{"_postman_id":"4029f895-cadb-4b19-ac03-3f5d93de8454","name":"Personal","schema":"https://schema.getpostman.com/json/collection/v2.1.0/collection.json","updatedAt":"2023-11-11T23:17:43.000Z","uid":"16867262-4029f895-cadb-4b19-ac03-3f5d93de8454"},"item":[{"name":"SignUp/LogIn","id":"aa0903c1-07b5-47ca-ae10-d3094842a688","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"POST","header":[],"body":{"mode":"raw","raw":"{\n    \"emailId\": \"sparsh10999899@gmail.com\",\n    \"password\": \"12345@asd\"\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:7000/users","protocol":"http","host":["localhost"],"port":"7000","path":["users"]}},"response":[],"uid":"16867262-aa0903c1-07b5-47ca-ae10-d3094842a688"},{"name":"Log Out","id":"2a1f32ce-0eec-41f0-a49f-a606fd32ca0f","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"auth":{"type":"bearer","bearer":[{"key":"token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoic3BhcnNoLnNoYXJtYTEwOGRAZ21haWwxLmNvbSIsInVzZXJJZCI6IjE3IiwiaWF0IjoxNjk5NjI1NjU2LCJleHAiOjE2OTk2MjU2NjZ9.rT_3QOHhClXu0jEWQsx1JiHI2Xp2me17-yPlH8DJvf","type":"string"}]},"method":"GET","header":[],"url":{"raw":"http://localhost:7000/users/logout","protocol":"http","host":["localhost"],"port":"7000","path":["users","logout"]}},"response":[],"uid":"16867262-2a1f32ce-0eec-41f0-a49f-a606fd32ca0f"},{"name":"Add Movie","id":"59b104e9-2f18-46b0-854a-7c56f74e5aec","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"auth":{"type":"bearer","bearer":[{"key":"token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoic3BhcnNoLnNoYXJtYTEwOGRAZ21haWwxLmNvbSIsInVzZXJJZCI6IjE3IiwiaWF0IjoxNjk5NjQwNTY0LCJleHAiOjE3MDM5NjA1NjR9.ywJbGfSch6EVQBsEb7BuUzfnBly8lIsGBVtvhoV2jRI","type":"string"}]},"method":"POST","header":[],"body":{"mode":"raw","raw":"{\n    \"name\": \"The Hunt 2\",\n    \"rating\": 1,\n    \"cast\": [{\"name\": \"sparsh\", \"role\": \"Actor\"}, {\"name\": \"Ajay Sharma\", \"role\": \"Director\"}],\n    \"genre\": \"Haunted\",\n    \"releaseDate\": \"2023-11-15 12:00:00\"\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:7000/movie/addMovie","protocol":"http","host":["localhost"],"port":"7000","path":["movie","addMovie"]}},"response":[],"uid":"16867262-59b104e9-2f18-46b0-854a-7c56f74e5aec"},{"name":"Get Movies","id":"5dd5e8be-fa4a-4355-bcf6-6a86a5a7740a","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"method":"GET","header":[],"url":{"raw":"http://localhost:7000/movie","protocol":"http","host":["localhost"],"port":"7000","path":["movie"]}},"response":[],"uid":"16867262-5dd5e8be-fa4a-4355-bcf6-6a86a5a7740a"},{"name":"Delete Movie","id":"48d7059e-4f7c-49a2-818f-907decd401fc","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"auth":{"type":"bearer","bearer":[{"key":"token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoic3BhcnNoMTA5OTk4OTlAZ21haWwuY29tIiwidXNlcklkIjoiMzciLCJpYXQiOjE2OTk3NDQ0OTksImV4cCI6MTcwNDA2NDQ5OX0.v_MVhfL9_sysj5bPMKVG_sYGIaS9G-Juc1lKe0gjqVE","type":"string"}]},"method":"GET","header":[],"url":{"raw":"http://localhost:7000/movie/deleteMovie?movieId=2","protocol":"http","host":["localhost"],"port":"7000","path":["movie","deleteMovie"],"query":[{"key":"movieId","value":"2"}]}},"response":[],"uid":"16867262-48d7059e-4f7c-49a2-818f-907decd401fc"},{"name":"update Movies","id":"7f3ec761-4645-4823-a385-4c7c0fbf2b07","protocolProfileBehavior":{"disableBodyPruning":true},"request":{"auth":{"type":"bearer","bearer":[{"key":"token","value":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbElkIjoic3BhcnNoLnNoYXJtYTEwOGRAZ21haWwxLmNvbSIsInVzZXJJZCI6IjE3IiwiaWF0IjoxNjk5NjQwNTY0LCJleHAiOjE3MDM5NjA1NjR9.ywJbGfSch6EVQBsEb7BuUzfnBly8lIsGBVtvhoV2jRI","type":"string"}]},"method":"POST","header":[],"body":{"mode":"raw","raw":"{\n    \"name\": \"The Hunt 2\",\n    \"rating\": 1,\n    \"cast\": [{\"name\": \"sparsh\", \"role\": \"Actor\"}, {\"name\": \"Ajay Sharma\", \"role\": \"Director\"}],\n    \"genre\": \"Haunted\",\n    \"releaseDate\": \"2023-11-15 12:00:00\",\n    \"movieId\": 37\n}","options":{"raw":{"language":"json"}}},"url":{"raw":"http://localhost:7000/movie/updateMovies","protocol":"http","host":["localhost"],"port":"7000","path":["movie","updateMovies"]}},"response":[],"uid":"16867262-7f3ec761-4645-4823-a385-4c7c0fbf2b07"}]}}

# LOOM URL
    https://www.loom.com/share/2bd096be63fa4a0794f93db9cd0e2b1a
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
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
        );
    2. User Table
        CREATE TABLE users (
            userId BIGSERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            jwtToken VARCHAR(255) NOT NULL,
            createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL,
            updatedAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP NOT NULL
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
    

