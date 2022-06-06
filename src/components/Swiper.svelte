<script lang="ts">
  import type { Swiper as SwiperInstance } from "swiper";
  import { FreeMode, Navigation, Thumbs } from "swiper";
  import { Swiper, SwiperSlide } from "swiper/svelte";

  export let images: string[];

  let thumbsSwiper: SwiperInstance | null = null;

  const setThumbsSwiper = (e: any) => {
    const [swiper] = e.detail;
    // set Thumbs swiper instance
    setTimeout(() => {
      thumbsSwiper = swiper;
    });
  };
</script>

<div class="gallery">
  <Swiper
    class="gallery__display"
    modules={[Navigation, Thumbs]}
    spaceBetween={10}
    navigation
    thumbs={{ swiper: thumbsSwiper }}
  >
    {#each images as path, i}
      <SwiperSlide>
        <img src={path} alt={`Slide ${i + 1}`} />
      </SwiperSlide>
    {/each}
  </Swiper>

  <Swiper
    on:swiper={setThumbsSwiper}
    class="gallery__thumbs"
    modules={[FreeMode]}
    freeMode
    slidesOffsetAfter={10}
    slidesOffsetBefore={10}
    slidesPerView={2}
    spaceBetween={10}
    watchSlidesProgress
    breakpoints={{ 750: { slidesPerView: 3 }, 1000: { slidesPerView: 4 } }}
  >
    {#each images as path, i}
      <SwiperSlide>
        <img src={path} alt={`Slide ${i + 1}`} />
      </SwiperSlide>
    {/each}
  </Swiper>
</div>

<style>
  @import "swiper/css";
  @import "swiper/css/navigation";

  :root {
    --swiper-theme-color: white !important;
  }

  :global(.gallery) {
    background: #303030;
    box-shadow: var(--drop-shadow);
    user-select: none;
  }

  :global(.gallery .swiper-slide) {
    height: auto;
  }

  :global(.gallery .swiper-slide img) {
    aspect-ratio: calc(16 / 9);
    object-fit: cover;

    width: 100%;
    height: 100%;
  }

  :global(.gallery__display) {
    width: 100%;
  }

  :global(.gallery__thumbs) {
    padding: 10px 0;
  }

  :global(.gallery__thumbs .swiper-slide) {
    opacity: 0.4;
    transition: opacity 100ms;
  }

  :global(.gallery__thumbs .swiper-slide:hover),
  :global(.gallery__thumbs .swiper-slide-thumb-active) {
    opacity: 1;
  }
</style>
