const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down Server due to Uncaught Exception`);

    process.exit(1);
})

// config dotenv
dotenv.config({path: 'backend/config/config.env'});

// connecting to mongoDB
connectDB();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down Server due to Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    })
})