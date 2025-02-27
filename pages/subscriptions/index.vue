<script lang="ts" setup>
import subscriptionsComponent from "@/components/subscriptions/subscriptionsComponent.vue";

import { useCookie } from "#app";
import { onMounted, ref } from "vue";

onMounted(() => {
  const newTotalAfterDiscount = ref(useCookie("NewTotalAfterDiscount"));
  const packageDetailsCookie = useCookie("packageDetails").value;
  const packageDetails =
    typeof packageDetailsCookie === "string"
      ? JSON.parse(packageDetailsCookie)
      : {};
  const lang = useCookie("lang").value;

  if (lang === "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(
        `.subscriptionsComponent ${selector}`
      );

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }

  // Ensure `snaptr` is available before calling it
  if (typeof window !== "undefined" && typeof window.snaptr === "function") {
    window.snaptr("track", "START_CHECKOUT", {
      price: newTotalAfterDiscount.value
        ? parseFloat(newTotalAfterDiscount.value) * 100
        : (packageDetails?.total || 0) * 100,
      currency: "INSERT_CURRENCY",
      item_ids: ["INSERT_ITEM_ID_1", "INSERT_ITEM_ID_2"],
      item_category: "INSERT_ITEM_CATEGORY",
      number_items: "INSERT_NUMBER_ITEMS",
      payment_info_available: "INSERT",
      uuid_c1: "INSERT_UUID_C1",
      user_email: "INSERT_USER_EMAIL",
      user_phone_number: "INSERT_USER_PHONE_NUMBER",
      user_hashed_email: "INSERT_USER_HASHED_EMAIL",
      user_hashed_phone_number: "INSERT_USER_HASHED_PHONE_NUMBER",
    });
  } else {
    console.error("Snapchat Pixel (snaptr) is not loaded.");
  }
});
</script>

<template>
  <div class="subscriptionsComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <subscriptionsComponent />
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.subscriptionsComponent {
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
}

@media (max-width: 787px) {
  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
