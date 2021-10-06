const fs = require("fs");
const http = require("http");

http.createServer(function (req, res) {
  const fileStream = fs.createReadStream();
  fileStream.on("open", () => {
    fileStream.pipe(res);
  });
  fileStream.on("error", (err) => {
    res.end(err);
  });
});
