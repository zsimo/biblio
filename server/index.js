"use strict";


var path = require("path");
var config = require(path.resolve(process.cwd(), "server", "config"));
var fastify = require('fastify')();
var writeFile = require(path.resolve(process.cwd(), "server", "faas", "write_file"));


var port = config.SERVER_PORT;
var publicPath = path.resolve(process.cwd(), "public");

fastify.register(require('fastify-file-upload'));

fastify.register(require('fastify-static'), {
    root: publicPath,
    prefix: '/'
});




fastify.listen(port, (err) => {
    if (err) {
        throw new Error(err);
    }

    console.log("http server listening on: " + JSON.stringify(fastify.server.address()));

});




// fastify.setNotFoundHandler(async function (request, reply) {
//
//     return reply.callNotFound();
//
// });



fastify.addHook('onRequest', async function (request, reply) {

    console.log(request.raw.url);

});


fastify.post('/upload', async function (request, reply) {
    // some code to handle file
    var files = request.raw.files;
    console.log(files)
    var fileArr = []
    for(let key in files){
        // fileArr.push({
        //     name: files[key].name,
        //     mimetype: files[key].mimetype
        // })
        writeFile(files[key]);
    }
    reply.send("ok")
});


