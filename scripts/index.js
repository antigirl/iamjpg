var enquire = require('./enquire.js');

function checkMediaQuery(query, cb) {
enquire.register(query, {
    match : function() {
        cb('match');
    },
    unmatch : function() {
        cb('un-match');
    },
    setup: function() {
        cb();
    }
});
}

function isSrcsetSupported() {
    return 'srcset' in new Image();
}

if(isSrcsetSupported()) {
    //return;
}

var images = document.getElementsByTagName('img');
var sizeArray = {};
for (var i = 0; i < images.length; i++) {
    var imgSrcset = images[i].getAttribute('srcset');
    var imgSizes = images[i].getAttribute('sizes');

    var srcsSplit = imgSrcset.split(' ');
    var size1 = srcsSplit[1].replace('w,','');
    var src1 = srcsSplit[0].replace(',','');
    var size2 = srcsSplit[3].replace('w','');
    var src2 = srcsSplit[2].replace(',','');

    sizeArray[size1] = src1;
    sizeArray[size2] = src2;

    var imgSizesSplit = imgSizes.split(' ');
    var imgSize1 = imgSizesSplit[1].replace('px,', '');
    var imgSize2 = imgSizesSplit[2].replace('px', '');
    var mediaQuery = imgSizes.substring(imgSizes.lastIndexOf('('), imgSizes.lastIndexOf(')')+1);
    //console.log(mediaQuery);
    //console.log(sizeArray);

    checkMediaQuery(mediaQuery, function(pass) {
        if (pass == 'match') {
            images[0].src = sizeArray[imgSize1];
        } else if (pass == 'un-match') {
            images[0].src = sizeArray[imgSize2];
        } else {
            images[0].src = sizeArray[imgSize2];
        }
    });
}
