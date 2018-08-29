const gulp = require('gulp');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const useref = require('gulp-useref');
const replace = require('gulp-replace');
const bSync = require('browser-sync');
const del = require('del');

const {resolveFrom} = require('./modules/path');

const src = 'src';
const production = 'dist';
const fromSrc = resolveFrom(src);
const toProduction = resolveFrom(production);

const sassScssFiles = ['sass/*.scss', 'sass/**/**/*.sass'].map(fromSrc);

gulp.task('scripts', () => 
    gulp.src(fromSrc('js/**/*.js'))
        .pipe(sourcemaps.init())
        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(toProduction('scripts')))
);

gulp.task('styles', () => 
    gulp.src(fromSrc('sass/global.scss'))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename('all.min.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(toProduction('styles')))
);

gulp.task('images', () =>
    gulp.src(fromSrc('images/*'))
        .pipe(imagemin())
        .pipe(gulp.dest(toProduction('content')))
);

gulp.task('processHTML', () => 
    gulp.src(fromSrc('index.html'))
        .pipe(useref({noAssets: true}))
        .pipe(replace(/src="images/g, 'src="content'))
        .pipe(gulp.dest(production))
);

gulp.task('copy', gulp.parallel(
    'processHTML',
    function copyInternal() {
        return gulp.src(fromSrc('icons/**/*'), {base: src})
            .pipe(gulp.dest(production));
    }
));

gulp.task('server', done => {
    bSync({server: {baseDir: ['dist', 'src']}});
    done();
});

gulp.task('reload', done => {
    bSync.reload();
    done();
})

gulp.task('clean', () => del([production]));

gulp.task('watch', done => {
    gulp.watch(sassScssFiles, gulp.series('styles', 'reload'));
    done();
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('scripts', 'styles', 'images', 'copy')
));

gulp.task('default', gulp.series('build', 'server', 'watch'));
