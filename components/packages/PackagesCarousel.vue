<script setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import PackageCard from "./PackageCard.vue";
import BusinessPackageCard from "./BusinessPackageCard.vue";

const props = defineProps({
  packages: {
    type: Array,
    required: true,
  },
  currentPackage: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const packageCards = ref([]);
const maxHeight = ref(0);

const updateMaxHeight = () => {
  nextTick(() => {
    requestAnimationFrame(() => {
      const heights = packageCards.value
        .map((card) => card?.$el?.offsetHeight || 0)
        .filter((height) => height > 0); // Ensure we're not adding undefined or zero heights
      if (heights.length > 0) {
        maxHeight.value = Math.max(...heights);
        packageCards.value.forEach((card) => {
          if (card?.$el) {
            card.$el.style.height = `${maxHeight.value}px`;
          }
        });
      }
    });
  });
};

const handleResize = () => {
  updateMaxHeight();
};

onMounted(() => {
  updateMaxHeight();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

watch(() => props.packages, updateMaxHeight, { deep: true });
</script>

<template>
  <div class="carsouselPackages">
    <VRow>
      <VCol
        cols="12"
        lg="4"
        md="6"
        sm="12"
        v-for="myPackage in packages"
        :key="myPackage.id"
      >
        <PackageCard
          v-if="!myPackage.is_business"
          ref="packageCards"
          :package="myPackage"
          :currentPackage="currentPackage"
          :is-center="myPackage.is_recommended"
        />

        <BusinessPackageCard
          v-else
          ref="packageCards"
          :package="myPackage"
          :currentPackage="currentPackage"
          :is-center="myPackage.is_recommended"
        />
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.carousel__slide {
  // inline-size: 400px !important;
}

.carsouselPackages {
  margin: auto;
  inline-size: 92%;
  margin-block-end: 50px;

  .carousel__next,
  .carousel__prev {
    display: none;
  }

  .carousel__slide .carousel__item {
    inline-size: 93% !important;
  }
}

.carsouselPackages .v-window-item {
  display: block !important;
}

.package-card {
  /* Default height styling can be set here if needed */
}

@media (max-width: 787px) {
  .carsouselPackages {
    margin: auto;
    inline-size: 92%;
  }
}
</style>
