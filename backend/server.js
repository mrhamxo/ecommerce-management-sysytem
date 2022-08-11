const app = require('./app');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// config dotenv
dotenv.config({path: 'backend/config/config.env'});

// connecting to mongoDB
connectDB();

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})
