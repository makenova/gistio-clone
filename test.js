var request = require('request');
var marked = require('marked');
marked.setOptions({
  highlight: function(code){}
});

var options = {
  url:'https://api.github.com/gists/7885923',
  headers: {
    'User-Agent': 'gistio-clone'
  }
}, callback = function(err, res, body){
  if (!err && res.statusCode == 200){
    var data = JSON.parse(res.body);
    console.log({
      'title': data.description,
      'user': data.owner.login,
      'files': marked(data.files['debounce1.js'].content)
    });
  }
};

request(options, callback);
