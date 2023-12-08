const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;
const noteRoutes = require("./routes/noteRoutes");
const cors = require("cors");

// This middleware allows us to post JSON in request.body
app.use(cors());

// This middleware implements Cross Origin Resource Sharing (CORS)
app.use(express.json());

// This middleware allows us to serve static files from a folder.
// Keep in mind that the folder name will *not* be part of the request path.
app.use(express.static("./client/build"));

// This middleware is just a basic example that runs on every request
// Calling next() is how you pass control to the next middleware
app.use((_req, _res, next) => {
    console.log("Middleware running");
    next();
});

// This middleware is another basic example that runs on every request
app.use((_req, _res, next) => {
    console.log("Middleware number 2 running");
    next();
});

// This middleware checks if we're getting JSON headers on our POST requests
// You can send a response right here and *not* call next() if you don't want to proceed.
app.use((req, res, next) => {
    if (req.method === "POST" && req.headers["content-type"] !== "application/json") {
        return res.status(400).send("Hey, you need to give me proper JSON");
    }

    // If all is well, continue to the next middleware
    next();
});

//this is used to connect to your react app
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

// To use routing, we define the endpoint using middleware syntax.
// The first paramater is the path, and the second is the router module.
// Your routes will be available at this path slash whatever your router endpoints are.
app.use("/notes", noteRoutes);

// Start the server listening
// It's convention to have this at the end of the file
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
