<script lang="ts" setup>
import NavBarI18n from "@/@core/components/I18n.vue";
const { locale } = useI18n({ useScope: "global" });

const isAppRtl = useCookie("isAppRtl");
const langCookie = useCookie("lang");

const i18nCompLanguages = [
  { label: "English", i18nLang: "en" },
  { label: "العربية", i18nLang: "ar" },
];

const handleLangChange = (lang: string) => {
  isAppRtl.value = lang === "ar" ? "true" : "false"; // Store as string (since cookies store strings)
  langCookie.value = lang;
  locale.value = lang; // Update locale dynamically

  // ✅ Ensure document updates only run in the browser
  if (process.client) {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
  }
};
</script>

<template>
  <NavBarI18n :languages="i18nCompLanguages" @change="handleLangChange" />
</template>
