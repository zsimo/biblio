"use strict";

const { createWorker, PSM } = require('tesseract.js');

const worker = createWorker({
    logger: m => console.log(m), // Add logger here
});


module.exports = function (img) {


    (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
           // tessedit_char_whitelist: '0123456789-',
            // tessedit_pageseg_mode: PSM.PSM_RAW_LINE
        });
        const { data: { text } } = await worker.recognize(img);
        console.log(text);
        await worker.terminate();
    })();


};