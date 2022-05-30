"use strict";

var path = require("path");

var cropImgJob = require(path.resolve(process.cwd(), "server", "jobs", "crop_img.js"));
var getIsbnFromImgJob = require(path.resolve(process.cwd(), "server", "jobs", "get_isbn_from_img.js"));
var isbnSearchJob = require(path.resolve(process.cwd(), "server", "jobs", "isbn_search.js"));

function extractIsbnFromText(text) {
    try {
        var tmp = text.split(" ");
        tmp = tmp[1].split("\n");
        const isbn = tmp[0].split("-").join("");
        return isbn;
    } catch (e) {}

}

module.exports = async function (img) {

    var croppedImg = await cropImgJob(img);
    var isbnResult = await getIsbnFromImgJob(croppedImg);
    const isbn = extractIsbnFromText(isbnResult);
    return await isbnSearchJob(isbn);

};