<script lang="ts" setup>
import PackagesCarousel from "@/components/packages/PackagesCarousel.vue";
import AppHeading from "~/@core/components/AppHeading.vue";
const subtitle = "packages";
const mainPargraph = "mainPargraph";

const tab = ref(null);
const items = ref(["year", "month"]);

const packages = ref([]);
const currentPackage = ref({});

const fetchPackages = async () => {
  try {
    const { $api } = useNuxtApp();

    const data = await $api<{}>("/package/packages");
    packages.value = data.body.packages.data;
    currentPackage.value = data.body.currentPackage;
  } catch (error) {
    console.error("Error fetching packages:", error);
  }
};

const monthlyPackages = computed(() => {
  return packages.value.filter((pkg) => pkg.period === "month");
});

const yearlyPackages = computed(() => {
  return packages.value.filter((pkg) => pkg.period === "year");
});

watchEffect(fetchPackages);
</script>

<template>
  <div class="packages">
    <VContainer>
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->

        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      </div>

      <!-- End Heading -->

      <!-- Start:: Packages -->
      <!-- <v-tabs v-model="tab">
        <v-tab v-for="(item, index) in items" :key="index" :value="index">
          {{ item.title }}
        </v-tab>
      </v-tabs> -->

      <v-tabs v-model="tab" show-arrows class="mb-4">
        <v-tab value="year"> {{ $t("year") }}</v-tab>

        <v-tab value="month" class="">{{ $t("month") }}</v-tab>
      </v-tabs>

      <v-card>
        <v-window v-model="tab" class="window">
          <v-window-item value="year">
            <v-container fluid>
              <PackagesCarousel
                :packages="yearlyPackages"
                :currentPackage="currentPackage"
              />
            </v-container>
          </v-window-item>

          <v-window-item value="month">
            <v-container fluid>
              <PackagesCarousel
                :packages="monthlyPackages"
                :currentPackage="currentPackage"
              />
            </v-container>
          </v-window-item>
        </v-window>
      </v-card>
    </VContainer>
  </div>
</template>

<style lang="scss">
.packages {
  margin-block-start: 74px;
}

.packages .heading {
  margin-block-end: -6px;
}

.packages .v-slide-group__container {
  justify-content: center;
  margin-block-end: 20px;
}

.packages .v-slide-group__content {
  flex: 0;
  padding: 6px;
  border: 1px solid #70a1e5;
  border-radius: 27.5px !important;
  block-size: 53px !important;
  gap: 10px;
}

.packages .v-tab.v-tab {
  background: transparent !important;
  block-size: 39px !important;
  color: #000 !important;
  font-size: 14px !important;
  font-weight: 700 !important;

  // padding-block: 11px !important;
  // padding-inline: 42px !important;
  text-align: center !important;

  &:hover {
    border-radius: 27.5px !important;
  }
}

.packages .v-tab.v-tab--selected {
  border-radius: 27.5px !important;
  background: linear-gradient(90deg, #157d99 0%, #70a1e5 100%) !important;
  color: #fff !important;
  font-size: 14px;
  font-weight: 700;
  line-height: 26.24px !important;
}

.packages .v-tabs--density-default {
  block-size: auto !important;
}

.packages .v-tab__slider {
  display: none !important;
}

.properties .tabs .window {
  .v-row:nth-child(2) {
    flex-direction: row-reverse;
  }

  h6 {
    color: #1c1c1c;
    font-size: 32px;
    font-weight: 500;
    line-height: 59.97px;
  }

  p {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: 0.01em;
    line-height: 29.98px;
  }

  span {
    color: #000;
    font-size: 16px;
    font-weight: 300;
    letter-spacing: 0.01em;
    line-height: 29.98px;
    text-align: center;
  }

  img {
    inline-size: 80%;
  }
}

.v-card--variant-elevated {
  box-shadow: none !important;
}

.package-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.package-card {
  // flex: 1;
  margin: 16px;
}

.package-card:nth-of-type(2) {
  margin-block-start: 0;
}
</style>
