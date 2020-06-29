import Swiper from "swiper";

const thumbs = new Swiper(".gallery-thumbs", {
    freeMode: true,
    slidesOffsetAfter: 10,
    slidesOffsetBefore: 10,
    slidesPerView: 4,
    spaceBetween: 10,
    watchSlidesProgress: true,
    watchSlidesVisibility: true
});

new Swiper(".gallery-top", {
    spaceBetween: 10,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    thumbs: {
        swiper: thumbs
    }
});
