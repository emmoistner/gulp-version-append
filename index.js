var gutil       = require('gulp-util')
  , buffer      = require('buffer').Buffer
  , PluginError = gutil.PluginError
  , map         = require('event-stream').map
  , appRoot     = require('app-root-path')

var versionRegex = function (extensions) {
  var exts = extensions.join('|')
    ,	regexString = '(\\.(?:' + exts + ')\\?v=)(\\@version\\@)([\' | \"])'
  return new RegExp(regexString, 'ig')
}

var appendVersionPlugin = function (extensions, v) {
  var version;
  if (v) {
    version = v
  } else {
    var PJ = appRoot.require('package.json')
    version = PJ && PJ.version
  }
  return map(function (file, cb) {
    if (!file) {
      throw new PluginError('gulp-rev-append', 'Missing file option for gulp-version-append.')
    }
    if (!file.contents) {
      throw new PluginError('gulp-rev-append', 'Missing file.contents required for modifying files using gulp-rev-append.')
    }

    file.contents = new Buffer(file.contents.toString().replace(versionRegex(extensions), '$1' + version + '$3'))
    cb(null, file)
  })
}

module.exports = appendVersionPlugin
