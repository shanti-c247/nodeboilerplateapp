# node-boilerplate

A boilerplate/starter project for quickly building RESTful APIs using Node.js, Express, and Mongoose. It includes essential features like standard folder structure, middleware setup, authentication, environment management, unit and integration testing and api docs enabling quick and essential configurations to save time and maintain consistency.

# How to setup boilerplate

## Installation by command
```
npx @chapter247ind/node-boilerplate setup {app-name}
```
or
```
npx @chapter247ind/node-boilerplate setup <app-name> --module <module-names-separated-by-comma> 
```

## Manual Installation
```
git clone --depth 1 https://github.com/Chapter247IND/node-boilerplate.git
cd node-boilerplate
npx rimraf ./.git
npm install
```

# Run app
```
cp .env.example .env
```
```
npm run dev
```

# View Swagger UI
- http://localhost:8080/api/v1/docs


 # Postman Collection
 - [https://documenter.getpostman.com/view/40131758/2sAYBa89GC](https://documenter.getpostman.com/view/40131758/2sAYBa89GC)

 # View Document 
  - https://courageous-meerkat-ebd331.netlify.app/

## Folder Structure

The folder structure of the boilerplate :

```plaintext
src/
├── config/                 # Configuration files
├── constants/              # Application-wide constants
├── enums/                  # Enums used throughout the app (e.g., user roles)
├── middlewares/            # Global middlewares
├── models/                 # Database models
├── controllers/            # Controllers handling user-related business logic
├── middlewares/            # Middlewares specific routes (e.g., auth)
├── models/                 # All-related data models
├── services/               # Services for operations, encapsulating complex logic
├── validations/            # Validation schemas for all-related operations
├── routes/                 # Global route definitions
├── types/                  # Type definitions
└── utils/                  # Utility functions, with module handlers
```

# Other useful commands
### List of modules commmand 
```
npx @chapter247ind/node-boilerplate module-list
 ```
### Add the existing module code in your project 
```
npx @chapter247ind/node-boilerplate add {module-name} 
```
### Help command 
```
npx @chapter247ind/node-boilerplate help 
 ```

## Each command generates specific files related to the module resource
 
  ### Generate Route
 ```diff 
npx @chapter247ind/node-boilerplate make:route <file-name>
```
 ### Generate Controller
```diff 
npx @chapter247ind/node-boilerplate make:controller <file-name>
```
 ### Generate Service
```diff 
npx @chapter247ind/node-boilerplate make:service <file-name>
```
 ### Generate Validation
```diff 
npx @chapter247ind/node-boilerplate make:validation <file-name>
```
 ### Generate Constants
```diff 
npx @chapter247ind/node-boilerplate make:model <file-name>
```

# Test cases
* **Unit Tests**: Isolated component tests with mocked dependencies, focusing on functionalities like user management and service logic.
* **Integration Tests**: Tests interactions between components, including real database operations and API endpoints, ensuring proper behavior for features like authentication and token issuance.

# HTTP Status Codes
A quick reference for commonly used HTTP status codes.

* **400** - Bad Request: The server cannot process the request due to invalid input.
* **401** - Unauthorized: Authentication required or failed.
* **403** - Forbidden: Request is valid, but access is denied.
* **404** - Not Found: The requested resource does not exist.
* **500** - Internal Server Error: The server encountered an unexpected issue.

# Biome for code formatting and linting
Biome is an all-in-one code formatter, linter, and analyzer designed to maintain consistent coding standards and optimize code quality.
