<script lang="ts" setup>
import { gsap } from "gsap";
import { onMounted, ref } from "vue";
import AppHeading from "~/@core/components/AppHeading.vue";

const subtitle = "about7L";
const mainPargraph = "mainPargraph";

const about_company = ref({
  description: "",
});

const getCompanyAbout = async () => {
  try {
    const { $api } = useNuxtApp();

    const data = await $api<{}>("/web-setting/webSettings");
    about_company.value = data.body.about_company;

    // Trigger GSAP animation after data is loaded
    gsap.fromTo(
      ".description",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  } catch {}
};

onMounted(() => {
  getCompanyAbout();

  // Animate heading on mount
  gsap.fromTo(
    ".aboutUs .AppHeading",
    { opacity: 0, scale: 0.9 },
    { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
  );
});
</script>

<template>
  <section>
    <div class="aboutUs">
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->
        <AppHeading
          class="AppHeading"
          :subtitle="subtitle"
          :mainPargraph="mainPargraph"
        />
        <!-- End Heading -->
      </div>
      <VContainer>
        <div style="width: 80%; margin: auto" class="privacyData">
          <div class="description" v-html="about_company.description"></div>
        </div>
      </VContainer>
    </div>
  </section>
</template>

<style lang="scss">
.aboutUs {
  .description {
    color: #000;
    font-family: Cairo-Regular;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    text-align: center;
    text-align: justify;
  }
}
</style>
