var debounce = require('./utils/debounce');
var isElementVisible = require('./utils/inviewport');
var respond = require('./respond');

var imagesArray = Array.prototype.slice.call(document.getElementsByClassName('iamjpg'), '');

var loadImage = function() {
    imagesArray.forEach(function (el) {
        if(isElementVisible(el)) {
            respond.setSrc(el);
        }
	});
}

function init() {
    addEventListener('DOMContentLoaded', loadImage, false);
    //addEventListener('load', debounce(loadImage, 1000), false);
    addEventListener('scroll', debounce(loadImage, 50), false);
    addEventListener('resize', debounce(loadImage, 50), false);
}

module.exports = {
    init: init
}
