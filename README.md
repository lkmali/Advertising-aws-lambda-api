# AWS Lambda Project

This project is an AWS Lambda application built using Node.js and TypeScript. It provides user authentication functionality, including sign-up and login features, and integrates with MongoDB for user data storage.

## Project Structure

```
aws-lambda-project
├── src
│   ├── handlers
│   │   ├── loginHandler.ts      # Handles user login requests
│   │   ├── signUpHandler.ts     # Handles user registration requests
│   │   └── jwtHandler.ts        # Utility functions for JWT operations
│   ├── services
│   │   └── mongoService.ts      # Functions for MongoDB interactions
│   ├── utils
│   │   └── responseHelper.ts     # Standardizes API response format
│   └── app.ts                   # Entry point of the application
├── tests
│   ├── loginHandler.test.ts      # Unit tests for loginHandler
│   ├── signUpHandler.test.ts     # Unit tests for signUpHandler
│   └── mongoService.test.ts      # Unit tests for mongoService
├── .github
│   └── workflows
│       └── deploy.yml           # GitHub Actions workflow for deployment
├── package.json                  # npm configuration file
├── tsconfig.json                 # TypeScript configuration file
├── serverless.yml                # Serverless Framework configuration file
└── README.md                     # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd aws-lambda-project
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Configure MongoDB:**
   Update the MongoDB connection string in `src/services/mongoService.ts` to point to your MongoDB instance.

4. **Deploy the application:**
   Use the Serverless Framework to deploy the application to AWS:
   ```
   serverless deploy
   ```

## API Endpoints

- **Sign Up**
  - **Endpoint:** `POST /signup`
  - **Description:** Registers a new user.
  - **Request Body:** `{ "username": "string", "password": "string" }`
  - **Response:** `{ "message": "User created successfully" }`

- **Login**
  - **Endpoint:** `POST /login`
  - **Description:** Authenticates a user and returns a JWT token.
  - **Request Body:** `{ "username": "string", "password": "string" }`
  - **Response:** `{ "token": "JWT token" }`

## Running Tests

To run the unit tests, use the following command:
```
npm test
```

## Deployment

This project uses GitHub Actions for CI/CD. The deployment workflow is defined in `.github/workflows/deploy.yml`. Ensure that your AWS credentials are set up in your GitHub repository secrets for automatic deployment on push to the main branch.

## License

This project is licensed under the MIT License.