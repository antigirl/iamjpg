module.exports.init = function() {
    document.getElementsByClassName('mobile-menu')[0].addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementsByTagName('header')[0].classList.toggle('active');
    });
}
