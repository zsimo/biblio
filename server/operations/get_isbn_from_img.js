"use strict";

var path = require("path");

var cropImgJob = require(path.resolve(process.cwd(), "server", "jobs", "crop_img.js"));
var getIsbnFromImgJob = require(path.resolve(process.cwd(), "server", "jobs", "get_isbn_from_img.js"));
var isbnSearchJob = require(path.resolve(process.cwd(), "server", "jobs", "isbn_search.js"));

module.exports = async function (img) {

    var croppedImg = await cropImgJob(img);
    var isbn = await getIsbnFromImgJob(croppedImg);
    var result = await isbnSearchJob(isbn);

    return result;

};