// load modules for the app
var express = require('express');
// end: load modules for the app

// setup variables
var app = express();
// end: load modules for the app

app.set('port', process.env.PORT || 8888);

app.get('/', function (req, res) {
    res.send('Hello!');
});

// custom 404 page
app.use (function (req, res) {
    res.type('text/plain');
    res.status(500).send('404 - Not Found');
});

// custom 505 page
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500).send('500 - Server Error');
});

// execute server
app.listen(app.get('port'), function () {
    console.log('\nBlog app started on http://localhost:' + app.get('port') 
    + ' and running in ' + app.get('env') 
    + ' environment; press Ctrl+C to terminate.');
});
