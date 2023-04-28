This is a Node.js application that uses Mongoose as the MongoDB object modeling tool, Supertest for HTTP testing and Jest as the test runner. The application provides CRUD API endpoints for managing users.

## Installation

Clone the repository and install the dependencies using the command below:

```shell
git clone <repository-link>
cd <project-folder>
npm install
```

## Configuration

Create a `.env` file in the root of your project folder and set the `MONGODB_URI` to your running MongoDB instance.

```
MONGO_USER=root
MONGO_PASS=example
MONGO_DB=mydb

NODE_ENV=development
PORT=7000
origin=http://localhost:7000
```

## Usage

To start the server, run the following command:

```shell
npm run dev
```

To run the tests, use the command:

```shell
npm test
```

## Endpoints

- `GET /`: Returns 200 status code on success.
- `POST /api/users/create/user`: Creates a new user.
- `GET /api/users/getUser`: Retrieves a user by ID.
- `POST /api/users/update/user`: Updates a user by ID.
- `POST /api/users/delete/user`: Deletes a user by ID.
- `GET /api/users/getUsers`: Retrieves all users.

## Testing

To run the tests, make sure to have `Jest` installed globally or included in the project dependencies. You can then run the tests with the command:

```shell
npm test
```

This will run all the tests in the application and provide feedback on whether each one has passed or failed.

## Acknowledgements

This application was built by using the following technologies:

- Node.js
- Mongoose
- Supertest
- Jest



#### Run the MongoDB and Mongo-Express

 start the docker containers

```
#up docker containers 
docker compose up -d   
#see the docker containers  
docker compose ps  
#stop the docker containers  
docker compose down  
#following logs of docker containers  
docker compose logs -f
```

**Note:** By default backend service listens on `TCP/7000` port and mongo-express is available on `TCP/8083`.
