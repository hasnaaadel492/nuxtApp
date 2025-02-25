<script lang="ts" setup>
const subtitle = "devices";
const mainPargraph = "mainPargraph";

watchEffect(() => {
  const lang = useCookie("lang");

  nextTick(() => {
    // Ensure `.devicesComponent` exists before modifying its children
    const devicesComponent = document.querySelector(".devicesComponent");

    if (devicesComponent && lang.value === "en") {
      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = devicesComponent.querySelectorAll(selector);

        if (elements.length > 0) {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        } else {
          console.warn(`No elements found for selector: ${selector}`);
        }
      });
    }
  });
});
</script>

<template>
  <div class="devicesComponent">
    <div
      class="d-flex justify-center align-center"
      style="flex-direction: column"
    >
      <!-- Start Heading -->

      <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      <!-- End Heading -->

      <!-- End:: Blogs -->
    </div>

    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <DevicesComponent />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.devicesComponent {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;
  padding-block-start: 150px;

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
  }

  .applications {
    margin: 0;
    padding-block-start: 170px;

    .heading {
      h3,
      p {
        animation: none !important;
      }
    }
  }
}

@media (max-width: 787px) {
  .devicesComponent {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
