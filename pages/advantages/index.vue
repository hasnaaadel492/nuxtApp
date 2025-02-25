<script lang="ts" setup>
import AdvantagesComponent from "@/components/advantages/AdvantagesComponent.vue";
watchEffect(() => {
  const lang = useCookie("lang");

  if (lang.value === "en") {
    nextTick(() => {
      const advantagesComponent = document.querySelector(
        ".advantagesComponent"
      );

      if (!advantagesComponent) {
        console.warn("`.advantagesComponent` not found in the DOM.");
        return;
      }

      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = advantagesComponent.querySelectorAll(selector);

        if (elements.length === 0) {
          console.warn(`No elements found for selector: ${selector}`);
        } else {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        }
      });
    });
  }
});
</script>

<template>
  <div class="advantagesComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <AdvantagesComponent />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.advantagesComponent {
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

  .advantages {
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
  .advantages {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
