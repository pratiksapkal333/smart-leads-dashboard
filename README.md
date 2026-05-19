---
# Smart Leads Dashboard

## Project Introduction

The Smart Leads Dashboard is a comprehensive lead management application designed to streamline the sales process. It enables teams to effectively track, filter, and manage potential client information through a centralized and secure interface.

## Project Overview

The application is built using the MERN stack (MongoDB, Express, React, Node.js) and is containerized using Docker to ensure consistency across development and production environments. It features a robust backend API with role-based access control and a modern, responsive frontend for data visualization and management.

## Development Steps

* **Environment Setup**: Initialized the project structure and configured Docker containers for the backend and frontend.
* **Database Schema Design**: Defined the Mongoose models to establish a consistent structure for lead data storage.
* **API Development**: Implemented core RESTful endpoints for CRUD operations and integrated JWT for secure authentication.
* **Role-Based Access Control**: Added middleware to restrict administrative functions, such as deleting records, to authorized users only.
* **Frontend Integration**: Developed the React dashboard with state management to handle filtering, searching, and sorting of lead data.
* **CSV Export Implementation**: Added a specialized route and controller logic to generate and stream CSV files based on applied filters.

## Project Screenshots


### Authentication & Signup

![Create Account](./images/Signuppage.png)
The registration interface allows new users to create an account, which is the first step in accessing the secure lead management system.

![Login Page](./images/Loginpage.png)
The secure login interface allows authorized users to authenticate into the system using their credentials.

### Theme Support

![Light Mode](./images/Lightmode.png)
The dashboard includes a light mode theme providing a clean, bright interface for daytime use.

![Dark Mode](./images/Darkmode.png)
The dashboard includes a dark mode theme to reduce eye strain during extended working hours.

### Lead Management

![Create Leads](./images/CreateLead.png)
This interface allows users to add new leads to the system by filling out a structured form, ensuring data consistency.

![Dashboard](./images/Editmenu.png)
The edit menu provides an intuitive way for users to modify existing lead information or update statuses directly within the dashboard.

### Infrastructure

![Dashboard](./images/DocketSetup.png)
The project utilizes Docker for container orchestration, ensuring the entire development stack is portable and easy to deploy across different environments.

## Common Errors and Resolutions

* **CastError: Cast to ObjectId failed for value "export"**
Reordered Express routes to ensure static routes (e.g., /export) are defined before dynamic routes (e.g., /:id) to prevent the router from misinterpreting the "export" path as a database ID.
* **Module has no exported member**
Ensured the function was explicitly added to the exports list in the controller file and verified that the import statement in the route file matched the function name exactly.
* **No token provided (during download)**
Updated the `authMiddleware` to accept the JWT token as a query parameter in addition to the standard `Authorization` header, enabling authenticated file downloads via `window.open`.
* **Property 'leads' does not exist on type**
Corrected the data extraction logic in the controller to reference `result.data` instead of `result.leads`, aligning the code with the structure returned by the service layer.

## API Documentation

Base URL: `http://localhost:5000/api`

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/auth/register` | POST | Register a new user | No |
| `/auth/login` | POST | Login and receive JWT | No |
| `/leads` | GET | Get all leads (paginated) | Yes |
| `/leads` | POST | Create a new lead | Yes |
| `/leads/:id` | DELETE | Delete a lead | Yes (Admin only) |
| `/leads/export` | GET | Download leads as CSV | Yes |
---