var debounce = require('./utils/debounce');
var isElementVisible = require('./utils/inviewport');
var respond = require('./respond');

var imagesArray = Array.prototype.slice.call(document.getElementsByClassName('iamjpg'), '');

var loadImage = function() {
    imagesArray.forEach(function (el) {
        if(isElementVisible(el)) {
            console.log(el.src,  '=> ', isElementVisible(el));
            respond.setSrc(el);
        }
	});
}

function init() {
    document.body.addEventListener('touchmove',function(e){
        if(event.target.parentNode.parentNode.className.indexOf('wrapper') === -1) {
           e.preventDefault();
       } else {
           return true;
       }
     });

    // addEventListener('DOMContentLoaded', loadImage, false);
    // //addEventListener('load', debounce(loadImage, 1000), false);
    // addEventListener('scroll', debounce(loadImage, 10), false);
    // addEventListener('resize', debounce(loadImage, 10), false);
    // document.getElementsByClassName('photo-wrapper')[0].addEventListener('scroll', debounce(loadImage, 10), false);
    //http://stackoverflow.com/questions/10238084/ios-safari-how-to-disable-overscroll-but-allow-scrollable-divs-to-scroll-norma
}

module.exports = {
    init: init
}
