var request = require('request');
var marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false
});

// TODO: serve gists from cache if no changes have been made since last request.
exports.getgist = function ( gistid, callback ){
  var options = {
    url:'https://api.github.com/gists/' + gistid,
    headers: {'User-Agent': 'gistio-clone'}
  };

  request(options, (err, res, body) => {
    if (err) return callback(err);
    if (res.statusCode !== 200) {
      return callback(new Error('Status Code: ' + res.statusCode));
    }

    var data = JSON.parse(res.body);
    var user = data.owner.login || 'unknown';

    prepFiles(data.files, function(err, files){
      return callback(null, {
        'title': data.description,
        'user': user,
        'url': data.html_url,
        'files': files
      });
    });
  });
};

// TODO Order the list of files in asciibetical order
function prepFiles (files, callback) {
  var fileArray = [];

  for (let fileKey in files) {
    let file = files[fileKey];

    if (file.language === 'Markdown') {
      file.content = marked(file.content)
      fileArray.push(file);
    } else if (file.language) {
      file.content = `<pre><code class="language-${file.language.toLowerCase()}">${file.content}</pre></code>`;
      fileArray.push(file);
    } else {
      fileArray.push(file);
    }
  }

  return callback(null, fileArray);
}
