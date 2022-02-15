// Base configs
const path = require("path")
const express = require("express")
const cors = require('cors')
const fs = require("fs")

// Prepare database
const db = require("./src/db/database")

// Load local .env file
require('dotenv').config({ path: path.resolve(__dirname, './.env') })

// Initialize express
const app = express();
const port = process.env.EINSTEIN_LOCAL_PORT;

// Enable cors
app.use(cors())

// routes
require("./src/routes/index")(app)

app.listen(port, () => {
    console.log("Einstein backend is running on port: ", port);
    console.log(`localhost:${port}/api/`)
});