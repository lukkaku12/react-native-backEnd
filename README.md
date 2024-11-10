
# Contact Management API Startup Guide

## Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** (At least version 20.2 or later)
- **npm** (Node Package Manager, comes with Node.js)
- **PostgreSQL** (running on the specified port, usually 5432)

## Setup Instructions

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone https://github.com/lukkaku12/react-native-backEnd.git
cd react-native-backEnd
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project and add the following configuration (with your own database information):

```plaintext
# Database configuration
DB_HOST=databaseHost
DB_PORT=port
DB_USERNAME=username
DB_PASSWORD=ALittleSecret
DB_DATABASE=defaultdb

# Other optional settings
DB_SYNCHRONIZE=true

JWT_SECRET=your_jwt_secret
```

Replace `your_jwt_secret` with a strong secret key for JWT.

### 4. Start the Development Server

You can now start the server in development mode with the following command:

```bash
npm run start:dev
```

This will start the application and make it available at `http://localhost:3000/`.

```

## Important Commands

- **Run the development server**: `npm run start:dev`

## Troubleshooting

- If you encounter a `ConnectionNotFoundError`, double-check your database connection settings in the `.env` file and ensure that your PostgreSQL server is running.
- Ensure that the necessary tables and entities are created in your database.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.
