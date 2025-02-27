<script setup>
import { ref } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import BlogCard2 from "./BlogCard2.vue";

const lang = useCookie("lang").value;

const props = defineProps({
  blogs: {
    type: Array,
    required: true,
  },
});

const blogCards = ref([]);

const breakpoints = computed(() => {
  const baseBreakpoints = {
    500: {
      itemsToShow: 1,
      snapAlign: "center",
    },
    750: {
      itemsToShow: Math.min(2, props.blogs.length),
      snapAlign: "start",
    },
    900: {
      itemsToShow: Math.min(3, props.blogs.length),
      snapAlign: "center",
    },
    1260: {
      itemsToShow: Math.min(3, props.blogs.length),
      snapAlign: "start",
    },
  };

  return baseBreakpoints;
});
</script>

<template>
  <div class="carsouselBlogs">
    <Carousel
      :breakpoints="breakpoints"
      :wrap-around="false"
      :autoplay="8000"
      :transition="500"
      :dir="lang == 'ar' ? 'rtl' : 'ltr'"
      @init="handleInit"
      @slide-start="handleSlideStart"
      ref="myCarousel"
      :pauseAutoplayOnHover="true"
    >
      <Slide v-for="myBlog in blogs" :key="myBlog">
        <div class="carousel__item big_image">
          <BlogCard2 ref="blogCards" :blog="myBlog" />
        </div>
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<style lang="scss">
.carsouselBlogs {
  margin: auto;
  block-size: 100%;
  inline-size: 92%;

  .carousel__viewport {
    height: 100%;
    overflow: hidden;
    width: 98%;
    margin: auto;
  }
  .carousel__next {
    inset-inline-end: -20px;
  }

  .carousel__prev {
    inset-inline-start: -20px;
  }

  .carousel__next,
  .carousel__prev {
    // display: none;
    border: 1px solid #5396cd;
    border-radius: 50%;
    background: #fff;

    // block-size: 40px;
    color: #5396cd;

    // inline-size: 40px;
  }
}

.carsouselBlogs .v-window-item {
  display: block !important;
}

.blog-card {
  /* Default height styling can be set here if needed */
}

@media (max-width: 787px) {
  .carsouselBlogs {
    margin: auto;
    inline-size: 92%;
  }
}
</style>
