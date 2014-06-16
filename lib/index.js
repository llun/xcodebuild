var _ = require('lodash')
  , path = require('path')
  , proc = require('child_process')

function xcodebuild() {

  var cb = typeof _.last(arguments) === 'function' ? _.last(arguments) : null
  var action = typeof _.first(arguments) === 'string' ? _.first(arguments) : null
  var options = {}
  if (action) {
    var object = _.first(_.toArray(arguments).shift())
    options = typeof object === 'object' ? object : options
  }
  else {
    options = typeof _.first(arguments) === 'object' ? _.first(arguments) : options
  }

  var root = (options ? options.path : null) || process.cwd()
  var parameters = []

  switch (action) {
    case 'showsdks':
      parameters.push('-showsdks')
      break;
    case 'clean':
      parameters.push(action)
      break;
    }

    var availableOptions = [ 'scheme', 'configuration' ]
    _.each(availableOptions, function (available) {
      if (options[available]) {
        parameters = parameters.concat(['-' + available, options[available]])
      }
    })

    var buildDir = path.join(root, options.buildDir || 'build')
    parameters.push('BUILD_DIR=' + buildDir)

    var child = proc.spawn('xcodebuild', parameters, {
      cwd: root
    })

  if (cb) cb()

}

module.exports = xcodebuild
