var articleCounter = 1;
var ArticleProvider = function ArticleProvider() {};


ArticleProvider.prototype.dummyData = [];

ArticleProvider.prototype.findAll = function findAll(callback) {
    callback(null, this.dummyData);
};

ArticleProvider.prototype.findById = function findById(id, callback) {
    var result = null;
    
    for (var i = 0; i < this.dummyData.length; i++) {
        if (this.dummyData[i]._id === id) {
            result = this.dummyData[i];
            break;
        }
    }
};

ArticleProvider.prototype.save = function save(articles, callback) {
    var article = null;
    
    if (typeof articles.length === "undefined") { articles = [articles]; }
    
    for ( var i = 0; i < articles.length; i++ ) {
        article = articles[i];
        article._id = articleCounter++;
        article.dateCreated = new Date();

        if (article.comments === undefined ) { article.comments = []; }

        for (var j = 0; j < article.comments.length; j++) {
            article.comments[j].created_at = new Date();
        }
        
        this.dummyData[this.dummyData.length] = article;
    }
    
    callback(null, articles);
};

// dummy data
new ArticleProvider().save([
  {title: 'Post one', content: 'Content one', comments:[{author:'Bob', comment:'I love it'}, {author:'Dave', comment:'This is rubbish!'}]},
  {title: 'Post two', content: 'Content two'},
  {title: 'Post three', content: 'Content three'}
], function(error, articles){});

exports.ArticleProvider = ArticleProvider;