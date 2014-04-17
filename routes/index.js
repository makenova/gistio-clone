//7885923
var request = require('request');
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false//,
  // highlight: function (code, lang, callback) {
  //   require('pygmentize-bundled')({ lang: lang, format: 'html' }, code, function (err, result) {
  //     callback(err, result.toString());
  //   });
  // }
});

function getgist ( gistid, cb ){
  var options = {
    url:'https://api.github.com/gists/' + gistid,
    headers: {
      'User-Agent': 'gistio-clone'
    }
  };
  var callback = function (err, res, body){
    if (!err && res.statusCode == 200){
      var data = JSON.parse(res.body);
      var user = data.owner.login || 'unknown';
      // console.log(user);
      var fileArray = [];
      for (var file in data.files) {
          fileArray.push(data.files[file]);
          if (data.files[file].language === "Markdown"){
            fileArray[fileArray.length-1].content = marked(fileArray[fileArray.length-1].content);
          } else if (data.files[file].language){
            data.files[file].content = '<pre><code class="language-' +
            (data.files[file].language).toLowerCase() + '">' +
            data.files[file].content +'</pre></code>';
          }
      }
      return cb(null, {
        'title': data.description,
        'user': user,
        'url': data.html_url,
        'files': fileArray
      });
    }
    return cb('there is an error',{});
  };

  request(options, callback);
}

module.exports = function(app){
  app.get('/', function(req, res){
    res.render('index', { title:'gistio-clone'} );
  });

  app.get('/:gistid', function(req, res){
    var gistid = req.params.gistid;
    getgist( gistid , function( err, data ){
      if(!err){
        res.render( 'gist', {title:data.title, author:data.user, url:data.url,files: data.files} );
      }
    });
  });
};
