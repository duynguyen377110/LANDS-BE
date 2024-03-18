"use strict"
const Instance = require("./src/utils/util-database");
const app = require("./src/index");
const environment = require("./environment");

const server = app.listen(process.env.PORT || environment.port, (err) => {
    if(err) console.log("Start server success");
    console.log("Start server success");
})