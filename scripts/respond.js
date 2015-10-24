var sizesArrayCached;

function isSrcsetSupported() {
    return 'srcset' in new Image();
}

function getImageSizes(imgEl) {
    if (sizesArrayCached === undefined) {
        var imgSizes = imgEl.getAttribute('sizes');
        var mediaQuery = imgSizes.substring(imgSizes.lastIndexOf('('), imgSizes.lastIndexOf(')') + 1);
        var sizesArray = imgSizes.replace(mediaQuery + ' ', '').replace(/px/g, '').split(', ');
        var mediaQueryMatch = window.matchMedia(mediaQuery).matches;
        sizesArrayCached = {
            store: sizesArray,
            mediaQueryMatch: mediaQueryMatch
        };
    }
    return sizesArrayCached;
}

function getImageSrc(imgEl) {
    var imgSrcset = imgEl.getAttribute('data-srcset');
    var srcsArray = imgSrcset.split(', ');
    var srcMap = {};

    if (isSrcsetSupported()) {
        return imgSrcset;
    }

    srcsArray.forEach(function(src) {
        var eachSrc = src.split(' ');
        var eachSize = eachSrc[1].replace('w', '');
        srcMap[eachSize] = eachSrc[0];
    });

    return srcMap;
}

module.exports.setSrc = function(imgEl) {
    var srcMap = getImageSrc(imgEl);
    var sizeMap = getImageSizes(imgEl);
    if (isSrcsetSupported()) {
        imgEl.srcset = srcMap;
    } else {
        if (sizeMap.mediaQueryMatch) {
            imgEl.src = srcMap[sizeMap.store[0]];
        } else {
            imgEl.src = srcMap[sizeMap.store[1]];
        }
    }

}
