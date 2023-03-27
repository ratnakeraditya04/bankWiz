document.addEventListener('scroll',() => {
    const header = document.querySelector('header');

    if (window.scrollY >0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
})

var header = $('.header');

$(window).scroll(function(e){
    if(header.offset().top !== 0){
        if(!header.hasClass('shadow')){
            header.addClass('shadow');
        }
    }else{
        header.removeClass('shadow');
    }
});