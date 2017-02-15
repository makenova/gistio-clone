var gist = require('../services/gist')

module.exports = function (app) {
  app.get('/', function (req, res, next) {
    res.render('index', { title: 'gistio-clone'})
  })

  app.get('/:gistid', function (req, res, next) {
    var gistid = req.params.gistid

    gist.getgist(gistid, function (err, gistData) {
      if (err) return next(err)

      return res.render('gist', {
        title: gistData.title,
        author: gistData.user,
        files: gistData.files,
        url: gistData.url
      })
    })
  })

  app.get('*', function (req, res, next) {
    return next(new Error('That is not an available page'))
  })
}
