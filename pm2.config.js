var path = require("path");
var config = require("./server/config");

module.exports = {
  "apps": [
    {
      "name": `dev:${config.APP_NAME}_static_server`,
      "script": "npm",
      "args": ["run", "server"],
      "error_file": path.resolve(__dirname, "logs", "pm2", `dev_${config.APP_NAME}_static_server.error.log`),
      "namespace": config.APP_NAME
    },
    {
      "name": `dev:${config.APP_NAME}_build_watch`,
      "script": "npm",
      "args": ["run", "watch"],
      "error_file": path.resolve(__dirname, "logs", "pm2", `dev_${config.APP_NAME}_build_watch.error.log`),
      "namespace": config.APP_NAME
    }
  ]
};