<script lang="ts" setup>
interface Props {
  subtitle: string;
  mainPargraph: string;
}

const props = defineProps<Props>();
</script>

<template>
  <!-- Start Heading -->
  <div class="heading d-flex align-center">
    <h3 class="subtitle">
      {{ $t($props.subtitle) }}
    </h3>
    <p class="mainPargraph">
      {{ $t($props.mainPargraph) }}
    </p>
  </div>
  <!-- End Heading -->
</template>

<style lang="scss" scoped>
.heading {
  flex-direction: column;
  inline-size: 50%;
  margin-block-end: 20px;
  margin-block-start: 40px;

  h3 {
    animation: opacity1 ease-in-out;

    // animation-duration: 500ms;
    animation-range-end: 500px;
    animation-range-start: cover;

    // animation-range: entry;
    animation-timeline: view();
  }

  p {
    animation: opacity2 ease-in-out;
    animation-range-end: 500px;
    animation-range-start: cover;

    // animation-range: entry;
    animation-timeline: view();
  }
}

@keyframes opacity1 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes opacity2 {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

// Responsive Style

@media (max-width: 787px) {
  .heading {
    flex-direction: column;
    inline-size: 65% !important;
  }

  .subtitle {
    font-size: 30px;
  }

  .mainPargraph {
    font-size: 14px;
    margin-block-end: 25px;
  }
}
</style>
