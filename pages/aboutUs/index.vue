<script lang="ts" setup>
onMounted(() => {
  const lang = localStorage.getItem("lang");
  if (lang === "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(
        `.aboutUsComponent ${selector}`
      );

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }
});
</script>

<template>
  <div class="aboutUsComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <AboutUsComponent />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.aboutUsComponent {
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

  .aboutUs {
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
  .aboutUs {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
