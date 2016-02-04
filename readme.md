# gulp-progressive-vulcans

> Gulp plugin for [progressive-vulcans](https://github.com/srikkbhat/progressive-vulcans) that
builds app with incremental dependencies.
*Issues with the output should be reported on the `progressive-vulcans` [issue tracker](https://github.com/srikkbhat/progressive-vulcans/issues).*


## Install

```
$ npm install --save-dev gulp-progressive-vulcans
```


## Usage

```js
var gulp = require('gulp');
var pvn = require('gulp-progressive-vulcans');

gulp.task('default', function () {
	return gulp.src('pvn.yaml')
		.pipe(pvn())
		.pipe(gulp.dest('dist'));
});
```

### Options

You can use options of progressive-vulcans. see [doc](https://github.com/srikkbhat/progressive-vulcans#usage) for further information.

## License

MIT © [srikkbhat](https://github.com/srikkbhat)
