var express = require("express");
var path = require("path");
const history = require("connect-history-api-fallback");
app = express();
app.use(history());
app.use(express.static(path.join(__dirname, "/dist")));
var port = process.env.PORT || 5000;
app.listen(port);
console.log("server started " + port);
