<script lang="ts" setup>
import AppHeading from "@/@core/components/AppHeading.vue";
const subtitle = "applications";
const mainPargraph = "mainPargraph";
watchEffect(() => {
  const lang = useCookie("lang");

  if (lang.value === "en") {
    nextTick(() => {
      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(
          `.applicationsComponent ${selector}`
        );

        if (elements.length > 0) {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        } else {
          console.warn(`No elements found for selector: ${selector}`);
        }
      });
    });
  }
});
</script>

<template>
  <div class="applicationsComponent">
    <!-- Heading -->
    <div
      class="d-flex justify-center align-center"
      style="flex-direction: column"
    >
      <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
    </div>
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <ApplicationsComponent />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.applicationsComponent {
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
  .applicationsComponent {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
