<script setup lang="ts">
const props = defineProps<{
  languages: { label: string; i18nLang: string }[];
}>();
const emit = defineEmits<{
  (e: "change", lang: string): void;
}>();

const { locale } = useI18n({ useScope: "global" });
const langCookie = useCookie("lang");

watch(locale, (val) => {
  document.documentElement.setAttribute("lang", val);
  langCookie.value = val;
  window.location.reload();
});
</script>

<template>
  <button
    v-if="langCookie === 'ar'"
    @click="
      locale = 'en';
      emit('change', 'en');
    "
    class="mt-1"
  >
    English
  </button>
  <button
    v-else
    @click="
      locale = 'ar';
      emit('change', 'ar');
    "
    class="mt-1"
  >
    العربية
  </button>
</template>

<style lang="scss" scoped>
button {
  margin: 0 !important;
  color: #000;
  font-family: Cairo-Regular;
  font-size: 16px;
}
</style>
