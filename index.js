var express = require('express');
var app = express();

app.use(express.static('public'))
app.get('/', (req, res) => res.redirect('./index.html'))
app.listen(3000);
console.log('server listening on port 3000')
