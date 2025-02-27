<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useCookie, useNuxtApp } from "#app";

const payment_status = ref("");
const payment_message = ref("");
const subtitle = "payment_done";
const mainPargraph = "mainPargraph";
const urlParams = ref<URLSearchParams | null>(null);

const { $api, $axios } = useNuxtApp();

const getPaymentStatus = () => {
  if (!urlParams.value) return;

  $api(`/payment/payment/${urlParams.value.get("id")}`)
    .then((response) => {
      if (response.status === 200) {
        // payment_status.value = response.data.body.payment.status;
        // payment_message.value = response.data.body.payment.message;
      }
    })
    .catch((error) => {
      console.error("Error retrieving payment status:", error);
    });
};

const callBackFunction = () => {
  if (!urlParams.value) return;

  $axios
    .post(`/payment/callback`, {
      payment_id: urlParams.value.get("id"),
    })
    .then((response) => {
      console.log("res", response);
    })
    .catch((error) => {
      console.error("error", error);
    });
};

// Run only in the browser
onMounted(() => {
  if (process.client) {
    urlParams.value = new URLSearchParams(window.location.search);

    const lang = useCookie("lang").value;
    if (lang === "en") {
      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = document.querySelectorAll(`.confirmation ${selector}`);

        elements.forEach((element) => {
          (element as HTMLElement).style.transform = "rotate(180deg)";
        });
      });
    }

    getPaymentStatus();
    callBackFunction();

    payment_status.value = urlParams.value.get("status") || "";
    payment_message.value = urlParams.value.get("message") || "";
  }
});
</script>

<template>
  <div class="confirmation">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <div class="confirmation-data" v-if="payment_status === 'failed'">
      <div class="d-flex justify-content-center">
        <VIcon
          icon="mdi-close-circle-outline"
          style="color: rgb(187 20 16); font-size: 14em"
        />
      </div>
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->
        <AppHeading :subtitle="''" :mainPargraph="$t(payment_message)" />
      </div>
      <router-link to="/payment">
        <MainButton
          :content="'payment_page'"
          class="subscriptionHeaderButton d-flex align-center"
      /></router-link>
    </div>

    <div class="confirmation-data" v-if="payment_status === 'paid'">
      <div class="d-flex justify-content-center">
        <img src="@/assets/images/payment_done.svg" alt="" />
      </div>
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->

        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      </div>
      <router-link to="/user/account-settings/account">
        <MainButton
          :content="'profile_page'"
          class="subscriptionHeaderButton d-flex align-center"
      /></router-link>
    </div>

    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.confirmation {
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

  .confirmation-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    block-size: 100%;
    justify-items: center;
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

  .subscriptionHeaderButton {
    button {
      font-family: Cairo-Bold;
      font-size: 14px;
      font-weight: 700;
      inline-size: 240px !important;
      line-height: 18.7px;
      margin-block-end: 0 !important;
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
