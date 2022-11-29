import "./Gallery.scss";

import { Component, createSignal, For } from "solid-js";
import type { Swiper as SwiperInstance } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper";
import { Swiper, SwiperSlide } from "swiper/solid";

export interface GalleryProps {
  paths: string[];
}

export const Gallery: Component<GalleryProps> = (props) => {
  const [thumbsSwiper, setThumbsSwiper] = createSignal<SwiperInstance | null>(null);

  return (
    <div class="gallery">
      <Swiper class="gallery__display" modules={[Navigation, Thumbs]} spaceBetween={10} navigation thumbs={{ swiper: thumbsSwiper() }}>
        <For each={props.paths}>
          {(path, i) => (
            <SwiperSlide>
              <img src={path} alt={`Slide ${i() + 1}`} />
            </SwiperSlide>
          )}
        </For>
      </Swiper>

      <Swiper
        class="gallery__thumbs"
        modules={[FreeMode]}
        freeMode
        slidesOffsetAfter={10}
        slidesOffsetBefore={10}
        slidesPerView={2}
        spaceBetween={10}
        watchSlidesProgress
        breakpoints={{ 750: { slidesPerView: 3 }, 1000: { slidesPerView: 4 } }}
        onSwiper={setThumbsSwiper}
      >
        <For each={props.paths}>
          {(path, i) => (
            <SwiperSlide>
              <img src={path} alt={`Slide ${i() + 1}`} />
            </SwiperSlide>
          )}
        </For>
      </Swiper>
    </div>
  );
};
