var path = require('path');

var app = require(path.join(path.join(__dirname, 'src'), 'app.js'));
app.listen(8000);
console.log("Now listening on port 8000");