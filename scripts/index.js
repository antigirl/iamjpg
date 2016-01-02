var lazyload = require('./lazyload');
var actions = require('./actions');
lazyload.init();
actions.init();

var photoWrapper = document.getElementsByClassName('photo-wrapper')[0];

window.addEventListener('resize', function () {
    console.log('resizing,', window.innerHeight);
    photoWrapper.style.height = window.innerHeight + 'px';
});
