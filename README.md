# iamjpg
gulp.task('default', ['connect', 'updateImageWidths:watch', 'metalsmith:watch', 'html:watch','sass:watch','scripts:watch']);
gulp.task('build', ['images-min','images-mobile','images-lqt', 'updateImageWidths', 'metalsmith','sass','scripts']);
