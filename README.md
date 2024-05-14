## Purpose

Node Js server: All APIs for User Authentication, User Management and Content Management.

## Setup

1. Install NodeJs: https://nodejs.org/en/download/
2. Go to the root directory of the project.
3. You can change the value in `env_sample` file as per your requirement and rename it with `.env`.
4. Run the following commands:

```
npm install
npm run start
```

### Code Architecture

1. In `src` directory you will get the entire code.
2. In `src/middlewares` directory you will get all the middlewares.
3. In `src/controllers` directory you will get all the controllers.
4. In `src/services` directory you will get all the services.
5. In `src/router.js` file you will get all the routes.
6. In `src/server.js` file you will get how server is created.
7. In `src/template` directory you will get email templates.
8. In `test` directory you will get all the apis test cases.

### Request flow

Request flow will be like : `server.js -> router.js -> middleware -> controller -> service`

### Log Format

You will find the logs in this format `[fileName][methodName] Error message` so with this format it becomes easy to locate the errors.

## API Documentation

### Create a User

Request

```
POST /signup
{
    "email":"jemin456789@gmail.com",
    "password":"Test@123",
    "firstName": "Jemin Cool",
    "lastName" :"Patel",
    "mobile":"+91123456789",
    "birthDate":"1992-05-21",
    "country":"IN",
    "state":"GJ",
    "address":"Dungri"
}
```

### Login User

Request

You will get token in response

```
POST /login
{
    "email":"jemin456789@gmail.com",
    "password":"Test@123"
}
```

### Logout User

Request

```
POST /logout
```

### Change User Password

Request

```
POST /change-password
{
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJqZW1pbkBpbnN0YS5jb20iLCJpYXQiOjE3MTU1NjY2MDQsImV4cCI6MTcxNTU3MDIwNH0.I3cHi_5dxubIRx3gzuP-9pzgInmCpb7AEIGKsndUxCc",
    "password":"TestNew@123"
}
```

### Forget Password

Request

It will send the email with the link and user need to follow that link to set the new password.

```
POST /forget-password
{
    "email":"jemin456789@gmail.com",
}
```

### Verify Email

Request

```
GET /verify-email?email=jemin456789@gmail.com&info=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlck5hbWUiOiJqZW1pbkBpbnN0YS5jb20iLCJpYXQiOjE3MTU1NjY2MDQsImV4cCI6MTcxNTU3MDIwNH0.I3cHi_5dxubIRx3gzuP-9pzgInmCpb7AEIGKsndUxCc

```

### Create a Post

Request

You need to pass token in Authorization header.

```
POST /post
{
    "medias": [{
            "type" : "TEXT",
            "content": "Sample Post third post "
        },
        {
            "type" : "IMAGE",
            "content": "https://fast.com/3"
        }
    ]
}
```

### Update a Post

Request

You need to pass token in Authorization header.

```
PUT /post/:id
{
   "medias": [
        {
            "type": "TEXT",
            "content": "Sample Post update"
        },
        {
            "type": "IMAGE",
            "content": "https://fast.com/updare"
        }
    ]
}
```

### Get a Post of the given Id

Request

You need to pass token in Authorization header.

```
GET /post/:id
```

### Get all posts or feed

Request

You need to pass token in Authorization header.

```
GET /post?limit=10&skip=0
```

### Delete the post

Request

You need to pass token in Authorization header.

```
DELETE /post/:id
```

## Run Test Cases

To run test cases run following command

```
npm run test
```

# Database Diagram

![DB Diagram](https://drive.google.com/file/d/1CDvK2qzAsugZPBmazVz1_PGBfKBwJe31/view?usp=sharing)

# AWS Architecture Diagram

![AWS Architecture](https://drive.google.com/file/d/15J16py576iUf7js0E8HgKU3mBYq0dx2g/view?usp=sharing)

We have to create different IAM roles to allow access to RDS and also to support code pipeline for CICD.

For CICD, we need to define a configuration file and we need to specify for which branch (develop/staging/production) we need to start CICD pipeline.
We also need to define different stages in that configuration 1) first is build stage using AWSCodeBuild and 2) then next stage is testing stage to run test cases and 3) then next stage is deployment using AWSCodeDeploy.

# Demo Video Code Walk through

https://www.loom.com/share/73b24facc7fc42aaaa7013892912468a?sid=cb245637-19c1-44de-8f1e-53b03df7d5d7
