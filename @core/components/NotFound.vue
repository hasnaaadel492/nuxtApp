<script setup lang="ts">
import misc404 from "@/assets/images/pages/404.png";
import ErrorHeader from "@/@core/components/ErrorHeader.vue";

import miscObj from "@/assets/images/pages/misc-404-object.png";
import miscMaskDark from "@/assets/images/pages/misc-mask-dark.png";
import miscMaskLight from "@/assets/images/pages/misc-mask-light.png";

import { useGenerateImageVariant } from "~/@core/composable/useGenerateImageVariant";

const miscThemeMask = useGenerateImageVariant(miscMaskLight, miscMaskDark);

let props = defineProps({
  errorDescription: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="misc-wrapper">
    <ErrorHeader
      error-code="400"
      :error-title="props.errorDescription + ' ⚠️ '"
    />

    <!-- 👉 Image -->
    <div class="misc-avatar w-100 text-center">
      <VImg
        :src="misc404"
        alt="Coming Soon"
        :height="$vuetify.display.xs ? 400 : 300"
        class="my-sm-4"
      />
      <VBtn to="/" class="mt-10">
        {{ $t("back_to_home") }}
      </VBtn>
      <VImg
        :src="miscThemeMask"
        class="d-none d-md-block footer-coming-soon"
        cover
      />

      <VImg
        :src="miscObj"
        class="d-none d-md-block footer-coming-soon-obj"
        :max-width="174"
        height="120"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use "@/@core/scss/template/pages/misc.scss";
</style>
<!-- 
<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
</route> -->
