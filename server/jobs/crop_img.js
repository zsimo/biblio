"use strict";

var fs = require('fs');
var path = require("path");
var Jimp = require('jimp');
// var gm = require('gm').subClass({ imageMagick: true });
// var smartcrop = require('smartcrop-gm');

const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp');

var dest = path.resolve(process.cwd(), "uploads", "dest.jpg");


// finds the best crop of src and writes the cropped and resized image to dest.
function applySmartCrop(src, dest, width, height) {
    return smartcrop.crop(src, { width: width, height: height })
        .then(function(result) {
            const crop = result.topCrop;
            return sharp(src)
                .extract({ width: crop.width, height: crop.height, left: crop.x, top: crop.y })
                // .resize(width, height)
                .toFile(dest);
        })
}

module.exports = function (img) {

    return new Promise(function (resolve, reject) {
        // Jimp.read(img)
        //     .then(image => {
        //         // Do stuff with the image.
        //         image.autocrop([.5, true]).clone();
        //         resolve(img);
        //     })
        //     .catch(err => {
        //         // Handle an exception.
        //         reject(err);
        //     });


        // applySmartCrop(img, dest, 300, 200);
        resolve(img);
    });

};

