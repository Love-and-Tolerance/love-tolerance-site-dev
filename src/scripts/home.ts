import { Navigation, Swiper, Thumbs } from "swiper";
import { initServerCard } from "./lib/server-card";

// Init server cards
document.querySelectorAll(".intro .server").forEach(initServerCard);

// Init showcase
Swiper.use([Navigation, Thumbs]);

const thumbs = new Swiper(".gallery-thumbs", {
    freeMode: true,
    slidesOffsetAfter: 10,
    slidesOffsetBefore: 10,
    slidesPerView: 4,
    spaceBetween: 10,
    watchSlidesProgress: true
});

// tslint:disable-next-line: no-unused-expression
new Swiper(".gallery-top", {
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    spaceBetween: 10,
    thumbs: {
        swiper: thumbs
    }
});
