<script lang="ts" setup>
import NavBarI18n from "@/@core/components/I18n.vue";
const { locale } = useI18n();

const isAppRtl = useCookie("isAppRtl");
const langCookie = useCookie("lang");

const i18nCompLanguages = [
  { label: "English", i18nLang: "en" },
  { label: "العربية", i18nLang: "ar" },
];

const handleLangChange = (lang: any) => {
  isAppRtl.value = lang === "ar" ? "true" : "false"; // Store as string (since cookies store strings)
  langCookie.value = lang;
  locale.value = lang;
};
</script>

<template>
  <NavBarI18n :languages="i18nCompLanguages" @change="handleLangChange" />
</template>
