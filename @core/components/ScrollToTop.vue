<script setup lang="ts">
const { y } = useWindowScroll();

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};
</script>

<template>
  <VScaleTransition
    style="
      background: linear-gradient(
        142.84deg,
        #157d99 0%,
        #70a1e5 100%
      ) !important;
      transform-origin: center;
    "
    class="scroll-to-top d-print-none"
  >
    <VBtn v-show="y > 200" icon density="comfortable" @click="scrollToTop">
      <VIcon
        size="22"
        icon="mdi-arrow-up"
        style="background: none !important; color: #fff"
      />
    </VBtn>
  </VScaleTransition>
</template>

<style lang="scss">
.scroll-to-top {
  position: fixed !important;

  // To keep button on top of v-layout. E.g. Email app
  z-index: 999;
  inset-block-end: 5%;
  inset-inline-end: 25px;
}

@media (max-width: 800px) {
  .scroll-to-top {
    display: none !important;
  }
}
</style>
