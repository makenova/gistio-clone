// Here ther be Dragons that spew messy code.
// Caveat Lector

var gist = require('../services/gist');

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', { title:'gistio-clone'} );
  });

  app.get('/:gistid', function(req, res, next){
    var gistid = req.params.gistid;

    gist.getgist( gistid , function( err, gistData ){
      if (err) { return next(err); }
      return res.render( 'gist', {
        title: gistData.title, author: gistData.user,
        url: gistData.url, files: gistData.files} );
    });
  });

  app.get('/*', function(req, res, next){
    return next(new Error('That is not an available page'));
  });
};
