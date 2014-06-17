# xcodebuild

Spawns xcodebuild as child process for building Xcode project from javascript.

## Usage

`xcodebuild(action, options, callback)`

### Sample

```javascript
var xcodebuild = require('xcodebuild')

gulp.task('build', function () {
  xcodebuild('build', {
    buildDir: 'build'
  }, function (error) {
    // Do something else after build
  })
})
```

### Available Actions

 - `build`, build Xcode project
 - `clean`, clean Xcode project
 - `showsdks`, list all supported sdks

### Available Options

 - `buildDir`, target build directory. Default is `build` in `src`
 - `scheme`, Xcode project build scheme
 - `configuration`, Xcode build configuration

## License

MIT
