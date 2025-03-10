<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useHead } from "#imports";
import AppFooter from "~/@core/components/AppFooter.vue";
import AppHeader from "~/@core/components/AppHeader.vue";
import ScrollToTop from "~/@core/components/ScrollToTop.vue";
import WhatsAppIcon from "@/@core/components/WhatsAppIcon.vue";

const lang = useCookie("lang");
const isAppRtl = useCookie("isAppRtl");

const metaTags = ref([]);
const { $axios } = useNuxtApp();
// Function to fetch meta data
const fetchMetaTags = async () => {
  try {
    const response = await $axios("/web-setting/webSettings"); // Replace with actual API URL
    metaTags.value = response.data.body.search_engine_optimizations;
  } catch (error) {
    console.error("Error fetching meta tags:", error);
  }
};
// Compute dynamic title and meta tags
const dynamicTitle = computed(() => {
  const titleTag = metaTags.value.find((tag) => tag.name === "title");
  return titleTag
    ? titleTag.translation.content[lang.value] || titleTag.content
    : "Default Title";
});
// Compute dynamic meta tags
const dynamicMeta = computed(() =>
  metaTags.value.map((tag) => ({
    name: tag.name,
    content: tag.translation.content[lang.value] || tag.content,
  }))
);

// Fetch meta tags on component mount
onMounted(fetchMetaTags);

// Update head meta tags dynamically
useHead({
  title: dynamicTitle,

  meta: dynamicMeta,
});
</script>

<template>
  <VLocaleProvider :rtl="isAppRtl">
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
  </VLocaleProvider>
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
