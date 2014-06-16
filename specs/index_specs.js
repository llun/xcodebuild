describe('xcodebuild', function () {

  var chai = require('chai')
    , sinon = require('sinon')
    , expect = chai.expect
    , proc = require('child_process')
    , xcodebuild = require('../lib')
    , cwd = process.cwd()

  chai.use(require('sinon-chai'))

  beforeEach(function () {
    sinon.stub(proc, 'spawn')
    proc.spawn.returns({
      on: sinon.stub(),
      once: sinon.stub()
    })

  })

  afterEach(function () {
    proc.spawn.restore()
  })

  it ('should pass current directory as xcodebuild path', function (done) {
    xcodebuild(function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'BUILD_DIR=' + cwd + '/build' ],
        {
          cwd: cwd
        })
      done()
    })
  })

  it ('should put clean action in spawn argument', function (done) {

    xcodebuild('clean', function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'clean', 'BUILD_DIR=' + cwd + '/build' ])
      done()
    })

  })

  it ('should put -showsdks when action is showsdks', function (done) {

    xcodebuild('showsdks', function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ '-showsdks', 'BUILD_DIR=' + cwd + '/build' ])
      done()
    })

  })

  it ('should add options to xcodebuild arguments', function () {

    xcodebuild({
      configuration: 'Release',
      scheme: 'Project'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ '-scheme', 'Project', '-configuration', 'Release',
          'BUILD_DIR=' + cwd + '/build' ])
      done()
    })

  })

  it ('should change build dir to new path', function (done) {

    xcodebuild({
      buildDir: 'release'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'BUILD_DIR=' + cwd + '/release' ])
      done()
    })

  })

  it ('should change cwd to path pass in options', function (done) {

    xcodebuild({
      path: 'path'
    }, function (error) {
      expect(proc.spawn).to.have.been.calledWith('xcodebuild',
        [ 'BUILD_DIR=path/release' ],
        { cwd: 'path' })
      done()
    })

  })

})
