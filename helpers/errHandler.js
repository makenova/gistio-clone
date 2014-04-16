module.exports = function(err, req, res, next) {
  res.render('error', {error: err});
};
