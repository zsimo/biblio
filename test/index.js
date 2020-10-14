"use strict";


var path = require("path");
// var readBarCode = require(path.resolve(process.cwd(), "server", "faas", "read_bar_code"));
var getIsbnFromFileJob = require(path.resolve(process.cwd(), "server", "operations", "get_isbn_from_img"));
var rawFile = path.resolve(process.cwd(), "uploads", "test.jpg");
var dest = path.resolve(process.cwd(), "uploads", "dest.jpg");
var isbn = path.resolve(process.cwd(), "uploads", "isbn.jpg");

//getIsbnFromFileJob(isbn);

var isbn = require('node-isbn');

isbn.resolve('9780134757599', function (err, book) {
    if (err) {
        console.log('Book not found', err);
    } else {
        console.log(JSON.stringify(book, null, 2));
    }
});




//
//
// var Tesseract = require('tesseract.js');
// Tesseract.detect(file, { logger: m => console.log(m) })
//     .then(({ data }) => {
//         console.log(data);
//     });

//
// console.log(TesseractWorker)
// return;
// var worker = new TesseractWorker();
// worker.recognize(file, "eng")
//     .progress(function (p) {
//         console.log(p);
//     })
//     .then(function (r) {
//         console.log(r);
//     });

// var Tesseract = require('tesseract.js');
//
// Tesseract.recognize(
//     file,
//     'eng',
//     {
//         logger: m => console.log(m)
//     }
// ).then(({ data: { text } }) => {
//     console.log(data);
//     console.log(text);
// })