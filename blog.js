// load modules for the app
var express = require('express');
var handlebars = require('express-handlebars').create({ defaultLayout:'main' });
var bodyParser = require('body-parser');
var ArticleProvider = require('./models/article.js').ArticleProvider;
// end: load modules for the app

var app = express();
var articleprovider = new ArticleProvider();

app.set('port', process.env.PORT || 8888);
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.disable('x-powered-by');

app.get('/', function (req, res) {
    articleprovider.findAll(function (error, articles) {
        var context = {
            articles: articles.map(function (article) {
                return {
                    id: article._id,
                    title: article.title,
                    content: article.content,
                    dateCreated: article.dateCreated
                };
            })
        };
        
        res.render('home', context);
    });
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
