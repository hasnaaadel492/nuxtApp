<script lang="ts" setup>
import { watchEffect, nextTick } from "vue";

watchEffect(() => {
  const lang = useCookie("lang");

  nextTick(() => {
    // Ensure `.termsComponent` exists before modifying its children
    const termsComponent = document.querySelector(".termsComponent");

    if (termsComponent && lang.value === "en") {
      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = termsComponent.querySelectorAll(selector);

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
  <div class="termsComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <TermsComponent />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.termsComponent {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
  }

  .terms {
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
  .terms {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
