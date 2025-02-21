<script lang="ts">
const useLang = () => useState("lang", () => "ar"); // Default language
const lang = useLang();

// ✅ Dynamically set direction
const isAppRtl = computed(() => lang.value === "ar");
</script>
<template>
  <div>
    <slot
      :dir="isAppRtl ? 'rtl' : 'ltr'"
      :class="{ rtl: isAppRtl, ltr: !isAppRtl }"
    />
  </div>
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
