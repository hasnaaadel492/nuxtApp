<script lang="ts">
// ✅ Dynamically set direction
const isAppRtl = useCookie("isAppRtl").value;
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
