Backend
 Project Overview
The backend of Task-33 is developed using Node.js, Express.js, and MongoDB.
It provides RESTful APIs to manage To-Do tasks and performs CRUD operations such as creating, reading, updating, and deleting tasks.

Technologies Used
Node.js
Express.js
MongoDb
Mongoose
dotenv
CORS
Nodemon

Backend Workflow
Client sends an HTTP request.
Express routes receive the request.
Controllers handle the request.
Services perform database operations.
Mongoose communicates with MongoDB.
Server returns the response to the client.

Security
Environment variables are stored in .env.
Database credentials must not be uploaded to GitHub.
.env and node_modules are excluded using .gitignore.

Project Information
Project: Task-33 – To-Do List Application
Module: Backend
Database: MongoDB
Runtime: Node.js
Framework: Express.js
