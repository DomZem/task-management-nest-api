
# Task Management API

The Task Management API provides a robust platform for users to manage tasks and projects efficiently. Built with TypeScript and NestJS, it offers secure authentication using JSON Web Tokens (JWT) and integrates seamlessly with PostgreSQL via Prisma for data storage. Users can register, login, and create boards to organize tasks, each with customizable statuses. Tasks can be created, updated, and deleted, with support for subtasks and task status updates.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`: Specifies the port on which the project will run. Example: `8080`

`DOMAIN`: Represents the domain associated with the project. Example: `localhost`

`CORS_ORIGIN`: Defines the allowed origins for Cross-Origin Resource Sharing. It should be the link to your client app. Example: `http://localhost:3000`

`JWT_SECRET_TOKEN`: Secret key used for signing JSON Web Tokens (JWT). Example: `JoY3tazD5jpm9nz2Mrs6fbbu48KRMmAd`

`JWT_EXPIRATION_SECRET`: Time duration for JWT expiration. Example an hour: `3600`

`POSTGRES_HOST`: Hostname or IP address of the PostgreSQL database. Example: `localhost`

`POSTGRES_PORT`: Port number for the PostgreSQL database. Example: `5434`

`POSTGRES_DB`: Name of the PostgreSQL database. Example: `invoice`

`POSTGRES_USER`: Username for connecting to the PostgreSQL database. Example: `prisma`

`POSTGRES_PASSWORD`: Password for the specified PostgreSQL user. Example: `xwAwsvmbCr9lCJD7`
## Run Locally
Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

⚠️ Before that step make sure you setup all env variables.

Create database by using Docker

```bash
  npm run db:dev:up
```

Apply migration and seed database

```bash
  npm run db:seed
```

Start the server

```bash
  npm run start:dev
```


## API Reference

#### Login

```http
  POST /auth/login
```
⚠️ That action method requires to send body data. Example request:
```http
  POST /auth/login
```

```javascript
{
  "email": "anakin.skywalker@gmail.com",
  "password": "zaq1@WSX"
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "createdAt": "2024-01-30T17:30:57.324Z",
}
```

***

#### Register

```http
  POST /auth/register
```

⚠️ That action method requires to send body data. Example request:
```http
  POST /auth/register
```

```javascript
{
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "password": "zaq1@WSX",
  "confirmPassword": "zaq1@WSX",
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "firstName": "Anakin",
  "lastName": "Skywalker",
  "email": "anakin.skywalker@gmail.com",
  "createdAt": "2024-01-31T13:00:31.738Z",
}
```

***

#### Logout

```http
  GET /auth/logout
```

🚀 Example data response:
```javascript
{
	"message": "Logged out"
}
```

***

#### Create board

```http
  POST /boards
```
⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  POST /invoice
```

```javascript
{
  "name": "Roadmap",
  "statuses": [
    { 
      "name": "Todo",
      "color": "#9333ea"
    }
  ] 
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "name": "Roadmap"
}
```

***

#### Get all boards

```http 
  GET /boards
```
⚠️ You must be logged in to send this request. Example request:
```http
  GET /boards
```

🚀 Example data response for:
```javascript
[
  {
    "id": 1,
    "name": "Roadmap"
  },
  {
    "id": 2,
    "name": "Platform launch"
  },
  {
    "id": 3,
    "name": "Webdesign"
  }
]
```

***

#### Get unique board

```http
  GET /boards/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Board unique id |

⚠️ You must be logged in to send this request. Example request:
```http
  GET /boards/1
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "name": "Roadmap"
}
```

***

#### Update board

```http
  PUT /boards/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Board unique id |

⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  PUT /boards/1
```

```javascript 
{   
  "name": "Frontend Roadmap",
  "statuses": [
    {
      "id": 1,
      "name": "Todo",
      "color": "#9333ea"
    },
    {
      "id": 2,
      "name": "Doing",
      "color": "#9333ea"
    }
  ]
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "name": "Frontend Roadmap"
}
```

***

#### Delete board

```http
  DELETE /boards/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Board unique id |

⚠️ You must be logged in to send this request. Example request:
```http 
  DELETE /boards/1
```

🚀 Example data response for:
```javascript
{
  "id": 1,
  "name": "Roadmap",
  "createdAt": "2024-02-04T14:33:17.426Z",
  "updatedAt": "2024-02-04T14:59:40.147Z",
  "userId": 1
}
```

***

#### Get all statuses by boardId

```http
  GET /statuses?boardId=${boardId}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `boardId` | `string` | **Required**. Board unique id |

⚠️ You must be logged in to send this request. Example request:
```http 
  GET /statuses?boardId=1
```

🚀 Example data response for:
```javascript
[
  {
    "id": 1,
    "name": "Todo",
    "color": "#9333ea"
  },
  {
    "id": 2,
    "name": "Doing",
    "color": "#9333ea"
  }
]
```

#### Create task

```http
  POST /tasks
```
⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  POST /tasks
```

```javascript
{
  "title": "Build settings UI",
  "description": "",
  "subtasks": [
    {
      "title": "Sketch UI concepts for settings page",
      "isComplete": false
    }
  ],
  "statusId": 1
}
```

🚀 Example data response:
```javascript
{
  "id": 1,  
  "title": "Build settings UI",
  "description": "",
  "createdAt": "2024-02-09T11:39:05.443Z",
  "updatedAt": "2024-02-09T11:39:05.443Z",
  "statusId": 1
}
```

***

#### Get all tasks by statusId

```http 
  GET /tasks?statusId=${statusId}
```
⚠️ You must be logged in to send this request. Example request:
```http
  GET /tasks?statusId=1
```

🚀 Example data response for:
```javascript
[
  {
    "id": 1,
    "title": "Build settings UI",
    "description": "",
    "statusId": 1
  },
  {
    "id": 2,
    "title": "Add search endpoints",
    "description": "Our goal is to develop the user interface components that facilitate an efficient search experience. Users should be able to quickly find what they're looking for.",
    "statusId": 1
  },
  {
    "id": 3,
    "title": "Design onboarding flow",
    "description": "This task involves developing the necessary backend API endpoints to enable robust search functionality. Implement search queries, filters, and sorting.",
    "statusId": 1
  },
  {
    "id": 4,
    "title": "Conduct 5 wireframe tests",
    "description": "We've created a comprehensive wireframe prototype that serves as a visual blueprint for our product's interface. This prototype is the result of careful planning.",
    "statusId": 1
  }
]
```

***

#### Update task

```http
  PUT /tasks/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Task unique id |

⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  PUT /tasks/1
```

```javascript 
{   
  "title": "Build settings UI",
  "description": "Our market research efforts have provided us with a deep understanding of the industry landscape, customer needs, and potential challenges.",
  "subtasks": [
    {
      "id": 1,
      "title": "Test account-related API functionalities",
      "isComplete": false
    }
  ],
  "statusId": 2
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "title": "Build settings UI",
  "description": "Our market research efforts have provided us with a deep understanding of the industry landscape, customer needs, and potential challenges.",
  "statusId": 2
}
```

***

#### Update task status

```http
  PATCH /tasks/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Task unique id |

⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  PATCH /tasks/1
```

```javascript 
{   
  "statusId": 1
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "title": "Build settings UI",
  "description": "Our market research efforts have provided us with a deep understanding of the industry landscape, customer needs, and potential challenges.",
  "statusId": 1
}
```

***

#### Delete task

```http
  DELETE /tasks/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Task unique id |

⚠️ You must be logged in to send this request. Example request:
```http 
  DELETE /tasks/1
```

🚀 Example data response for:
```javascript
{
  "id": 1,
  "title": "Build settings UI",
  "description": "Our market research efforts have provided us with a deep understanding of the industry landscape, customer needs, and potential challenges.",
  "createdAt": "2024-02-04T17:37:45.673Z",
  "updatedAt": "2024-02-09T12:16:14.673Z",
  "statusId": 1
}
```

***

#### Get all subtasks by taskId

```http 
  GET /subtasks?taskId=${taskId}
```
⚠️ You must be logged in to send this request. Example request:
```http
  GET /subtasks?taskId=1
```

🚀 Example data response for:
```javascript
[
  {
    "id": 1,
    "title": "Sketch UI concepts for settings page",
    "isComplete": false
  }
]
```

***

#### Update subtask isComplete

```http
  PATCH /subtasks/${id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. Subtask unique id |

⚠️ You must be logged in to send this request.

⚠️ That action method requires to send body data. Example request:
```http
  PATCH /subtasks/1
```

```javascript 
{   
  "isComplete": true
}
```

🚀 Example data response:
```javascript
{
  "id": 1,
  "title": "Sketch UI concepts for settings page",
  "isComplete": true,
  "taskId": 1
}
```
## Tech Stack

![Static Badge](https://img.shields.io/badge/postgresql-4169e1?style=for-the-badge&logo=postgresql&logoColor=white)

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)

![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

