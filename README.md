# Gulp-Building

Playing around with gulp and building some common front-end tasks.

- _gulp scripts_ minify, concatenate and copy all js files to _dist/scripts_ with sourcemaps included.
- _gulp styles_ compiles scss files into css, then concatenate and minify to _dist/styles_ with sourcemaps included.
- _gulp images_ optimize JPEG and PNG file sizes and is copied to _dist/content_.
- _gulp clean_ deletes _dist_ folder.
- _gulp processHTML_ changes the index.html from the _src_ so it is more fitting for a production build. Includes minified/concatenated js and css file links. Makes sure all paths for images are correct.
- _gulp copy_ copies all other files to _dist_. (This would be the _icons_ folder.)
- _gulp server_ runs a live server.
- _gulp reload_ refreshs the browser, when server is live.
- _gulp watch_ runs watchers observering over any changes to js or scss/sass files. These changes will either run the scripts or styles task depending on which file is being changed live.
- _gulp build_ does clean, scripts, styles, images, and copy tasks.
- _gulp_ does all tasks in a optimal series.
