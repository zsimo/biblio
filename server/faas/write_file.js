"use strict";

var fs = require('fs');
var path = require("path");
const UPLOADS_DIR = path.resolve(process.cwd(), "uploads");

fs.mkdirSync(UPLOADS_DIR, { recursive: true });

module.exports = async function (file) {

    // file.name
    // file.data // buffer

    fs.writeFileSync(path.resolve(UPLOADS_DIR, file.name), file.data);



};