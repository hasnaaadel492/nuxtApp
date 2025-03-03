<script lang="ts" setup>
import packagesComponents from "~/components/packages/packagesComponents.vue";
onMounted(() => {
  if (typeof window !== "undefined" && typeof snaptr !== "undefined") {
    snaptr("track", "PURCHASE", {
      price: "INSERT_PRICE",
      currency: "INSERT_CURRENCY",
      transaction_id: "INSERT_TRANSACTION_ID",
      item_ids: ["INSERT_ITEM_ID_1", "INSERT_ITEM_ID_2"],
      item_category: "INSERT_ITEM_CATEGORY",
      number_items: "INSERT_NUMBER_ITEMS",
      uuid_c1: "INSERT_UUID_C1",
      user_email: "INSERT_USER_EMAIL",
      user_phone_number: "INSERT_USER_PHONE_NUMBER",
      user_hashed_email: "INSERT_USER_HASHED_EMAIL",
      user_hashed_phone_number: "INSERT_USER_HASHED_PHONE_NUMBER",
    });
  } else {
    console.error("Snap Pixel (snaptr) is not loaded yet.");
  }
});
</script>

<template>
  <div class="packagesComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <packagesComponents />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.packagesComponent {
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

  .packages {
    margin: 0;
    padding-block-start: 145px;

    .heading {
      h3,
      p {
        animation: none !important;
      }
    }

    .package-card {
      margin-block-start: 0 !important;
    }

    .v-slide-group__container {
      margin-block-end: 0 !important;
    }
  }
}

@media (max-width: 787px) {
  .packages {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
