const fs = require('fs');
const exec = require('child_process').exec;

const args = process.argv.splice(2);
const originFileName = args[0] || '';
const resultFileName = args[1] || '';

if (!originFileName) {
  return console.error('请输入源文件名');
}
const fileStr = `const gulp = require('gulp');
const minify = require('gulp-minify');
const rename = require('gulp-rename');

gulp.task('jsmin', function () {
  return gulp.src('src/${originFileName}')
    .pipe(minify())${resultFileName ? `\n.pipe(rename('${resultFileName}'))` : ''}
    .pipe(gulp.dest('dist'))
});
`;

fs.writeFile('gulpfile.js', fileStr, function (err) {
  if (err) {
    return console.error(err);
  }
  return console.log('gulpfile.js 创建成功!');
});
const cmd = 'npm run build';

exec(cmd, function (err, stdout, stderr) {
  if (err) {
    return console.error(stderr);
  }
});

