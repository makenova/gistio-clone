var request = require('request'),
    marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false
});

exports.getgist = function ( gistid, cb ){
  var options = {
    url:'https://api.github.com/gists/' + gistid,
    headers: {'User-Agent': 'gistio-clone'}
  };
  var callback = function (err, res, body){
    if (!err && res.statusCode == 200){
      var data = JSON.parse(res.body);
      var user = data.owner.login || 'unknown';

      prepFiles( data.files, function(err, files){
        return cb(null, {
          'title': data.description,
          'user': user,
          'url': data.html_url,
          'files': files
        });
      });
    } else{
      return cb(err,{});
    }
  };

  request(options, callback);
};

function prepFiles (files, callback) {
  var fileArray = [];
  for (var file in files) {
    fileArray.push(files[file]);
    if (files[file].language === "Markdown"){
      fileArray[fileArray.length-1].content = marked(fileArray[fileArray.length-1].content);
    } else if (files[file].language){
      files[file].content = '<pre><code class="language-' +
      (files[file].language).toLowerCase() + '">' +
      files[file].content +'</pre></code>';
    }
  }
  return callback(null, fileArray);
}
