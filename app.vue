<script setup lang="ts">
import { computed } from "vue";
import AppFooter from "~/@core/components/AppFooter.vue";
import AppHeader from "~/@core/components/AppHeader.vue";
import ScrollToTop from "~/@core/components/ScrollToTop.vue";
import WhatsAppIcon from "@/@core/components/WhatsAppIcon.vue";

const lang = useCookie("lang");
const isAppRtl = useCookie("isAppRtl");
</script>

<template>
  <NuxtLayout
    :dir="isAppRtl ? 'rtl' : 'ltr'"
    :class="{ rtl: isAppRtl, ltr: !isAppRtl }"
  >
    <AppHeader />
    <NuxtPage />
    <AppFooter />
    <WhatsAppIcon />
    <ScrollToTop />
  </NuxtLayout>
</template>

<style scoped>
/* ✅ Add dynamic styles for RTL */
.rtl {
  direction: rtl !important;
  text-align: right !important;
}

.ltr {
  direction: ltr !important;
  text-align: left !important;
}
</style>
