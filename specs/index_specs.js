describe('xcodebuild', function () {

  var chai = require('chai')
    , sinon = require('sinon')
    , expect = chai.expect
    , proc = require('child_process')
    , xcodebuild = require('../lib')
    , cwd = process.cwd()
    , through2 = require('through2')
    , events = require('events')

  chai.use(require('sinon-chai'))

  beforeEach(function () {
    sinon.stub(proc, 'spawn')

    var mock = new events.EventEmitter
    mock.stdin = mock.stdout = mock.stderr = sinon.stub(through2())

    proc.spawn.returns(mock)

  })

  afterEach(function () {
    proc.spawn.restore()
  })

  it ('should pass current directory as xcodebuild path', function (done) {
    var build = xcodebuild(function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'BUILD_DIR=' + cwd + '/build' ],
        {
          cwd: cwd
        })
      done()
    })
    build.emit('close')

  })

  it ('should put clean action in spawn argument', function (done) {

    var build = xcodebuild('clean', function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'clean', 'BUILD_DIR=' + cwd + '/build' ])
      done()
    })
    build.emit('close')

  })

  it ('should put -showsdks when action is showsdks', function (done) {

    var build = xcodebuild('showsdks', function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ '-showsdks', 'BUILD_DIR=' + cwd + '/build' ])
      done()
    })
    build.emit('close')

  })

  it ('should add options to xcodebuild arguments', function (done) {

    var build = xcodebuild({
      configuration: 'Release',
      scheme: 'Project'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ '-scheme', 'Project', '-configuration', 'Release',
          'BUILD_DIR=' + cwd + '/build' ])
      done()
    })
    build.emit('close')

  })

  it ('should change build dir to new path', function (done) {

    var build = xcodebuild({
      buildDir: 'release'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'BUILD_DIR=' + cwd + '/release' ])
      done()
    })
    build.emit('close')

  })

  it ('should change cwd to path pass in options', function (done) {

    var build = xcodebuild({
      path: 'path'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'BUILD_DIR=path/build' ],
        { cwd: 'path' })
      done()
    })
    build.emit('close')

  })

  it ('should build with action and parameters options', function (done) {

    var build = xcodebuild('clean', {
      path: 'path',
      buildDir: 'release',
      scheme: 'Test',
      configuration: 'Configuration'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'clean', '-scheme', 'Test', '-configuration', 'Configuration',
          'BUILD_DIR=path/release' ],
        { cwd: 'path' })
      done()
    })

    build.emit('close')

  })

})
