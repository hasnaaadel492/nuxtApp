<script lang="ts" setup>
const subtitle = ref("renew_package");
const mainPargraph = "mainPargraph";

import PaymentComponent from "@/components/subscriptions/PaymentComponent.vue";
import SummaryComponent from "@/components/subscriptions/SummaryComponent.vue";

const packageDetails = ref({
  id: "",
  title: "",
  price: "",
  period: "",
  description: "",
});

onMounted(() => {
  const lang = useCookie("lang").value;
  if (lang === "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(`.subscripitions ${selector}`);

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }
  const route = useRoute();
  const query = route.query;
  if (query) {
    packageDetails.value = {
      title: query.title || "",
      price: query.price || "",
      period: query.period || "",
      description: query.description || "",
    };
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
      <VCard class="renew">
        <div class="mb-7">
          <SummaryComponent />
        </div>
        <!-- Donatted line -->
        <div class="donatted-line"></div>
        <div>
          <!-- Package Card -->
          <PaymentComponent :packageId="packageDetails.id" />
        </div>
      </VCard>
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
  padding-block-start: 150px;

  .heading {
    h3,
    p {
      animation: none !important;
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

  .renew {
    margin: auto;
    background-color: #fff !important;
    box-shadow: 0 0 34px 0 #00000012;
    inline-size: 70%;
    padding-block: 50px;
    padding-inline: 40px;

    @media (max-width: 500px) {
      inline-size: 96%;
      padding-inline: 10px;
    }

    .total .d-flex:nth-child(3) {
      background: transparent !important;
    }
  }
}

@media (max-width: 787px) {
  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
