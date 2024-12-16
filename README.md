# Bytive Backend Assignment

This is a simple backend application built with Express and Mongoose for managing tasks. It provides RESTful APIs to create, read, update, and delete tasks.

## Prerequisites

- Node.js
- MongoDB

## Installation

1. Clone the repository:
    ```sh
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```sh
    cd bytive_backend_assignment
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```

## Configuration

Update the MongoDB connection string in  to match your MongoDB setup:
```javascript
mongoose.connect('your-mongodb-connection-string', {
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err));
