<script setup lang="ts">
import Applicationscomponent from "@/pages/applications/index.vue";
import DevicesComponent from "@/components/devices/DevicesComponentHome.vue";
import { defineAsyncComponent, ref, watchEffect } from "vue";

// Dynamically importing components
const HeroComponent = defineAsyncComponent(
  () => import("@/components/home/heroComponent.vue")
);

const AdvantagesComponent = defineAsyncComponent(
  () => import("@/pages/advantages/index.vue")
);
const ContactComponent = defineAsyncComponent(
  () => import("@/components/home/contactComponent.vue")
);
const PackagesComponents = defineAsyncComponent(
  () => import("@/pages/packages/index.vue")
);

const BlogsComponent = defineAsyncComponent(
  () => import("@/pages/blogs/index.vue")
);

const header = ref({});
const contacts = ref({});

const fetchSettings = async () => {
  try {
    const { $api } = useNuxtApp();

    const data = await $api<{}>("/web-setting/webSettings");
    header.value = data.body.header;
    contacts.value = data.body.contacts;
  } catch (error) {
    console.error(error);
  }
};

watchEffect(() => {
  fetchSettings();
});
</script>

<template>
  <div class="home">
    <HeroComponent :header="header" />

    <div class="both">
      <AdvantagesComponent />
      <PackagesComponents />
    </div>
    <div class="both" style="margin-top: 40px">
      <Applicationscomponent />
      <DevicesComponent />
      <BlogsComponent />
    </div>

    <VContainer>
      <ContactComponent :contacts="contacts" />
    </VContainer>
  </div>
</template>

<style lang="scss">
.home {
  .both {
    background-image: url("@/assets/images/advantages.svg") !important;
    background-repeat: no-repeat;
    background-size: cover;
    block-size: 100%;
    inline-size: 100%;
  }

  .blogs {
    background-image: url("@/assets/images/blogs.svg") !important;
    background-repeat: no-repeat;
    background-size: 50%;
    block-size: 100%;
    inline-size: 100%;
  }
}
</style>
