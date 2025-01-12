"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var bodyParser = require("body-parser");
var cors_1 = require("cors");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(bodyParser.json());
// Routes
app.get("/", function (req, res) {
    res.send("Email Signature Backend is running");
});
// Start server
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
