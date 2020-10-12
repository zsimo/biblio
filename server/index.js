"use strict";


var path = require("path");
var {URL} = require("url");
var fastify = require('fastify')();
var config = require(path.resolve(process.cwd(), "server", "config"));
var publicPath = path.resolve(process.cwd(), "public");

// fastify.register(require('fastify-file-upload'))


fastify.register(require('fastify-static'), {
    root: publicPath,
    prefix: '/'
});

fastify.addHook('onRequest', async function (request, reply) {

    console.log(request.raw.url);

});

fastify.get('/ciao', async function (request, reply) {


    reply.send("ciao")


});


fastify.listen(config.SERVER_PORT, async function (err) {
    if (err) {
        throw new Error(err);
    }

    console.log("server listening on: " + JSON.stringify(fastify.server.address()));
});