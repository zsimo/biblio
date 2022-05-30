"use strict";

const { createWorker, PSM } = require('tesseract.js');

const worker = createWorker({
    logger: function (m) {
        console.log(m);
    }
});


module.exports = async function (img) {


    // (async () => {
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');
        await worker.setParameters({
           // tessedit_char_whitelist: '0123456789-',
            // tessedit_pageseg_mode: PSM.PSM_RAW_LINE
        });
        const result = await worker.recognize(img);
        await worker.terminate();

        return result.data.text;
    // })();


};