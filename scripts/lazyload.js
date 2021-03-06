var debounce = require('./utils/debounce');
var isElementVisible = require('./utils/inviewport');
var respond = require('./respond');

var imagesArray = Array.prototype.slice.call(document.getElementsByClassName('iamjpg'), '');

var loadImage = function() {
    imagesArray.forEach(function (el, i) {
        if (i < 3) {
            respond.setSrc(el);
        } else if(isElementVisible(el)) {
            //console.log(el.src,  '=> ', isElementVisible(el));
            respond.setSrc(el);
        }
	});
}

function init() {
    document.addEventListener('DOMContentLoaded', function() {
        loadImage();
    }, false);
    document.addEventListener('resize', debounce(loadImage, 10), false);
    document.addEventListener('scroll', debounce(loadImage, 10), false);
    document.getElementsByClassName('photo-wrapper')[0].addEventListener('scroll', debounce(loadImage, 10), false);
}

module.exports = {
    init: init
}
