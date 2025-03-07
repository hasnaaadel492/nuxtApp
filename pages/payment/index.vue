<script lang="ts" setup>
import paymentComponemt from "@/components/subscriptions/PaymentComponent.vue";
import AppHeading from "~/@core/components/AppHeading.vue";
const subtitle = ref("choosing_payment_method");
const mainPargraph = "mainPargraph";
onMounted(() => {
  const lang = useCookie("lang").value;
  if (lang == "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(`.subscripitions ${selector}`);

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }
});
</script>

<template>
  <div class="subscripitions">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <VContainer>
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->

        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      </div>

      <div class="wizard">
        <paymentComponemt />
      </div>
    </VContainer>
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.subscripitions {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;
  padding-block-start: 74px;

  @media (max-width: 1200px) {
    padding-block-start: 20px;
  }

  .heading {
    margin-block-end: -6px;
  }

  .wizard {
    margin: auto;
    background-color: #fff !important;
    box-shadow: 0 0 34px 0 #00000012;
    inline-size: 70%;
    padding-block: 50px;
    padding-inline: 40px;

    @media (max-width: 1280px) {
      inline-size: 92% !important;

      // padding-inline: 10px;
    }

    @media (max-width: 670px) {
      inline-size: 92% !important;

      // padding-inline: 10px;
    }

    @media (max-width: 570px) {
      inline-size: 100% !important;
      padding-inline: 10px;
    }
  }

  @media (max-width: 787px) {
    .hero-circel1,
    .hero-circel2 {
      display: none !important;
    }
  }

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
  }
}
</style>
