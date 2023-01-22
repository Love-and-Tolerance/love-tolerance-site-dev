import "./Gallery.scss";

import { Component, createSignal, For } from "solid-js";
import { FreeMode, Lazy, Navigation, Swiper as SwiperInstance, Thumbs, Zoom } from "swiper";
import { Swiper, SwiperSlide } from "swiper/solid";

export interface GalleryPicture {
  alt: string;
  originalSrc: string;
  thumbnailSrc: string;
}

export interface GalleryProps {
  pictures: GalleryPicture[];
}

export const Gallery: Component<GalleryProps> = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = createSignal<SwiperInstance | null>(null);

  return (
    <div class="gallery">
      <Swiper
        class="gallery__display"
        modules={[Lazy, Zoom, Navigation, Thumbs]}
        spaceBetween={10}
        lazy
        zoom
        navigation
        thumbs={{ swiper: thumbsSwiper() }}
      >
        <For each={props.pictures}>
          {(picture) => (
            <SwiperSlide>
              <div class="swiper-zoom-container">
                <img data-src={picture.originalSrc} alt={picture.alt} class="swiper-lazy" />
              </div>
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
            </SwiperSlide>
          )}
        </For>
      </Swiper>

      <Swiper
        class="gallery__thumbs"
        modules={[Lazy, FreeMode]}
        lazy
        freeMode
        slidesOffsetAfter={10}
        slidesOffsetBefore={10}
        slidesPerView={2}
        spaceBetween={10}
        watchSlidesProgress
        breakpoints={{ 750: { slidesPerView: 3 }, 1000: { slidesPerView: 4 } }}
        onSwiper={setThumbsSwiper}
      >
        <For each={props.pictures}>
          {(picture) => (
            <SwiperSlide>
              <img data-src={picture.thumbnailSrc} alt={picture.alt} class="swiper-lazy" />
              <div class="swiper-lazy-preloader swiper-lazy-preloader-white" />
            </SwiperSlide>
          )}
        </For>
      </Swiper>
    </div>
  );
};
