// cluster.js
const cluster = require("cluster");
const os = require("os");
const path = require("path");

const numCPUs = os.cpus().length;
const basePort = parseInt(process.env.PORT || 3000);

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({ PORT: basePort + i });
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork(); // restart on crash
  });
} else {
  require(path.resolve(__dirname, "server.js"));
}
