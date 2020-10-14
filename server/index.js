"use strict";


var path = require("path");
var config = require(path.resolve(process.cwd(), "server", "config"));
var fastify = require('fastify')({
    bodyLimit: 5242880
});
var writeFile = require(path.resolve(process.cwd(), "server", "faas", "write_file"));
var readBarCode = require(path.resolve(process.cwd(), "server", "faas", "read_bar_code"));


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
    for(let key in files) {
        var file = files[key];
        writeFile(file);
        readBarCode(path.resolve(process.cwd(), "uploads", file.name));
    }
    reply.send("ok")
});


