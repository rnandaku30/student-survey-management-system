# StudentSurveyApp

This is a full-stack application for a student survey system, which includes:

- **node-server**: An Express-based app that fetches zip codes.
- **student-survey-backend**: A Spring Boot application that serves as the backend for survey data.
- **student-survey-ui**: The Angular frontend for the survey application.

## Table of Contents

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Setting Up node-server](#1-setting-up-node-server)
  - [Setting Up student-survey-backend](#2-setting-up-student-survey-backend)
  - [Setting Up student-survey-ui](#3-setting-up-student-survey-ui)
  - [Running the Full Application](#4-running-the-full-application)
- [Available Commands](#5-additional-commands)
  - [Angular Commands](#angular-cli-commands)
  - [Spring Boot Commands](#maven-commands-for-spring-boot)
- [Environment Configuration](#6-environment-configuration)
- [Project Structure](#7-project-structure)
- [Conclusion](#8-conclusion)


## Prerequisites

Before you can run this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)
- [Java](https://www.java.com/)
- [Maven](https://maven.apache.org/)
- [MySQL](https://www.mysql.com/) (for local database or use AWS RDS)

## Setup Instructions

### 1. Setting Up `node-server`

The `node-server` folder contains an Express app to fetch zip code-related data. Here's how to set it up:

1. Navigate to the `node-server` directory:
   cd node-server
2. Install the dependencies:
   npm install
3. Start the server:
   npm start
The server will be running on `http://localhost:3000/`. You can access zip code data at: http://localhost:3000/zipcodes/:zip



---

## 2. Setting Up `student-survey-backend`

This is a Spring Boot application that handles the backend functionality of the survey. The backend uses a MySQL database for storing survey data.

### Steps to Run:

1. **Create a `.env` file** in the root directory of `student-survey-backend` with the following content:
    DB_URL=your-database-url 
    DB_USERNAME=your-database-username 
    DB_PASSWORD=your-database-password

2. The `.env` file will not be pushed to GitHub. Please copy the values from `sample.env` to the `.env` file.

3. To build and run the Spring Boot application, execute:
    mvn clean install 
    mvn spring-boot:run

The backend will be available at: http://localhost:8080/


---

## 3. Setting Up `student-survey-ui`

This is the Angular frontend for the survey application. It interacts with the backend API to submit and view survey data.

### Steps to Run:

1. Navigate to the `student-survey-ui` folder:
    cd student-survey-ui

2. Install dependencies:
    npm install

3. Update the API URL in `src/environments/environment.ts`:

    export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:8080/api' // The base URL for your REST API
    };

    Start the Angular development server:
        ng serve

The Angular application will be running at: http://localhost:4200/

## 4. Running the Full Application
To run the full application:

Start the node-server (Zip Code API):
    cd node-server
    npm start
Start the student-survey-backend (Spring Boot backend):
    cd student-survey-backend
    mvn clean install
    mvn spring-boot:run
Start the Angular frontend:
    cd student-survey-ui
    ng serve
    
## 5. Additional Commands

    Angular CLI Commands:
    1. Generate a new component:
        ng generate component component-name
    2. Build the project:
        ng build
    3. Run unit tests:
        ng test
    4. Run end-to-end tests:
        ng e2e

    Maven Commands for Spring Boot:
    1. Clean and install dependencies:
        mvn clean install
    2. Run the application:
        mvn spring-boot:run

## 6. Environment Configuration
For the backend to work correctly, you must set up environment variables for the database connection.

Add the following variables in the .env file:

DB_URL=your-database-url
DB_USERNAME=your-database-username
DB_PASSWORD=your-database-password
The .env file is required to run the Spring Boot backend locally. A sample.env file is included in the repository as an example.

## 7. Project Structure

```bash
student-survey-app/
│── node-server/          # Express server for zip code lookup
│── student-survey-backend/ # Spring Boot backend for survey storage
│── student-survey-ui/    # Angular frontend for survey form
│── README.md            # Project documentation
```

## 8. Conclusion
This project enables students to fill out a survey and submit it through the Angular UI, which communicates with the Spring Boot backend. The zip code data is fetched from the node-server Express API, which provides city and state details based on the entered zip code.

Note: Please ensure the correct configuration of database credentials in the .env file before running the application.
