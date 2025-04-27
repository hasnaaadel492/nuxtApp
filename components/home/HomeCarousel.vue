<template>
  <div class="carousel-container">
    <VContainer>
      <v-carousel
        height="400"
        :show-arrows="false"
        cycle
        hide-delimiter-background
      >
        <v-carousel-item v-for="(image, i) in props.header.images" :key="i">
          <div
            class="d-flex fill-height justify-center align-center carousel-image-container"
          >
            <img :src="image.url" alt="image" />
          </div>
        </v-carousel-item>
      </v-carousel>
    </VContainer>
  </div>
</template>
<script setup lang="ts">
import { VContainer } from "vuetify/lib/components/index.mjs";
// const images = ref([])
const props = withDefaults(defineProps<Props>(), {
  header: () => ({
    title: "",
    description: "",
    images: [],
  }),
});

interface header {
  title: string;
  description: string;
  image: array;
}

interface Props {
  header?: header;
}
</script>
<style lang="scss">
.carousel-container {
  margin-block-start: 20px;

  .v-carousel {
    block-size: 450px !important;
  }

  .carousel-image-container {
    border-radius: 25px;
    block-size: 100%;
    inline-size: 100%;

    img {
      border-radius: 25px;
      block-size: 100%;
      inline-size: 100%;
      object-fit: cover;
    }
  }
}
</style>
