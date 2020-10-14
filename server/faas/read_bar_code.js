"use strict";

var fs = require('fs');
var path = require("path");
var Quagga = require('quagga').default;


module.exports = async function (file) {

    // file.name
    // file.data // buffer

    Quagga.decodeSingle({
        src: file,
        numOfWorkers: 0,  // Needs to be 0 when used within node
        // inputStream: {
        //     size: 800  // restrict input-size to be 800px in width (long-side)
        // },
        decoder: {
            //readers: ["ean_8_reader"], // List of active readers
            // multiple: true,
            // readers: [{
            //     format: "ean_reader",
            //     config: {
            //         supplements: [
            //             'ean_5_reader', 'ean_2_reader'
            //         ]
            //     }
            // }]

            readers : [{
                format: "code_128_reader",
                config: {}
            }, {
                format: "ean_reader",
                config: {
                    supplements: [
                                'ean_5_reader', 'ean_2_reader'
                            ]
                }
            }, {
                format: "code_39_reader",
                config: {}
            }, {
                format: "code_93_reader",
                config: {}
            }]

        },

        // multiple: true,
    }, function(result) {
        console.log(JSON.stringify(result, null, 2))
        Quagga.onProcessed(function (a) {
            console.log(a)
        })

        if(result.codeResult) {
            console.log("result", result.codeResult.code);
        } else {
            console.log("not detected");
        }
    });



};