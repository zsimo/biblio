"use strict";

var isbnService = require('node-isbn');

module.exports = function (isbn) {

    return new Promise(function (resolve, reject) {

        isbnService.resolve(isbn, function (err, book) {
            if (err) {
                reject(err);
            } else {
                resolve(book);
            }
        });

    });


};