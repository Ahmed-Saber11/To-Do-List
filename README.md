# To-Do List API with Docker

A simple, containerized RESTful API built using **Express.js** for managing a to-do list. 
This project demonstrates API development, Docker containerization, multi-stage builds, and OpenAPI documentation with Swagger.

---

## Project Scope
This project is part of **Advanced Operating Systems **, covering:

- Docker bridge networking
- Container volumes and data persistence
- Multi-stage Dockerfile best practices
- Containerized API development with Swagger documentation
- Docker image publishing to Docker Hub

---

## Features

### Task Management
- `GET /tasks`: List all tasks (supports query filters)
- `POST /tasks`: Create a new task
- `GET /tasks/:id`: Retrieve a task by ID
- `PUT /tasks/:id`: Update a task
- `DELETE /tasks/:id`: Delete a task

###  Task Status & Priority
- `PUT /tasks/:id/complete`: Mark task as complete
- `PUT /tasks/:id/incomplete`: Mark task as incomplete
- `PUT /tasks/:id/priority`: Change task priority

###  Swagger Documentation
Interactive API docs available at:  
**http://localhost:3000/api-docs**

---

## 🛠️ Tech Stack

- **Backend:** Node.js (Express.js)
- **Documentation:** Swagger (OpenAPI 3.0)
- **Containerization:** Docker (Node 18 Alpine, multi-stage)

