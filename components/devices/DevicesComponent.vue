<script lang="ts" setup>
import { ref, onMounted } from "vue";
import DeviceCard from "./DeviceCard.vue";
import { paginationMeta } from "~/@fake-db/utils";
import { useNuxtApp, useRouter } from "#app"; // ✅ Import `useRouter`

const router = useRouter(); // ✅ Initialize `router`
// Data
const devices_section = ref([]);
const totalPage = ref(1);
const totalDevices = ref(0);
const btnLoading = ref(false);

const options = ref({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

// ✅ Fetch devices using async/await with correct params
const fetchDevices = async () => {
  try {
    btnLoading.value = true;
    const { $api } = useNuxtApp();

    const data = await $api<{}>(
      `/devices/devices?status=1&page=${options.value.page}`
    );

    // ✅ Check response structure before accessing data
    devices_section.value = data.body.devices.data;
    totalPage.value = data.body.devices.paginate.last_page;
    totalDevices.value = data.body.devices.paginate.total;
    options.value.page = data.body.devices.paginate.current_page;
  } catch (error) {
    console.error("Error fetching devices:", error);
  } finally {
    btnLoading.value = false;
  }
};

// ✅ Handle pagination click
const handlePaginationClick = (newPage: number) => {
  options.value.page = newPage;
  fetchDevices();
};

// ✅ Fetch devices on mount
onMounted(fetchDevices);
</script>

<template>
  <div class="devices_section">
    <!-- Cards -->
    <VContainer v-if="devices_section.length > 0">
      <VRow class="cards">
        <VCol
          cols="12"
          md="4"
          sm="6"
          v-for="(DeviceCardData, index) in devices_section"
          :key="index"
        >
          <DeviceCard :DeviceCardData="DeviceCardData" />
        </VCol>
      </VRow>
      <VRow
        style="justify-content: center"
        v-if="router.currentRoute.value.path === '/devices'"
      >
        <!-- Pagination -->
        <VCol cols="12">
          <VDivider />
          <div class="d-flex gap-x-6 flex-wrap justify-end pa-2">
            <div class="d-flex text-sm align-center text-high-emphasis">
              {{ paginationMeta(options, totalDevices) }}
            </div>
            <div class="d-flex gap-x-2 align-center">
              <VBtn
                class="flip-in-rtl"
                icon="mdi-chevron-left"
                variant="text"
                density="comfortable"
                color="default"
                :disabled="btnLoading || options.page <= 1"
                @click="handlePaginationClick(options.page - 1)"
              />

              <VBtn
                class="flip-in-rtl"
                icon="mdi-chevron-right"
                density="comfortable"
                variant="text"
                color="default"
                :disabled="
                  btnLoading ||
                  options.page >= Math.ceil(totalDevices / options.itemsPerPage)
                "
                @click="handlePaginationClick(options.page + 1)"
              />
            </div>
          </div>
        </VCol>
      </VRow>
    </VContainer>
    <VContainer>
      <div v-if="totalDevices === 0" class="d-flex justify-center align-center">
        <p
          class="mainPargraph text-start"
          style="font-size: 26; font-weight: 600; margin-block-end: 7px"
        >
          {{ $t("No devices found") }}
        </p>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss">
.devices_section {
  position: relative;

  // background-image: url('@/assets/images/terminology-background.svg') !important;
  background-repeat: no-repeat;
  background-size: 50%;
  block-size: 100%;
  inline-size: 100%;
  margin-block-start: 74px;

  .cards {
    color: #000;

    // gap: 5px;

    .card {
      padding: 23px;
      border: 1px solid #70a1e5;
      border-radius: 16px;

      // animation: fade-in ease-in-out;
      animation-range-end: 200px;
      animation-range-start: cover;
      animation-timeline: view();
      background: transparent;
      block-size: 100% !important;
      gap: 2px;
      margin-block-start: 5px;
      margin-inline-start: 5px;
      transition: all 0.5s ease-in-out;

      &:hover {
        border: none;
        background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
        box-shadow: #70a1e5 0 0 5px 2px;
        color: #fff;
        transform: scale(1.06);
        transition: 0.5s all ease-in-out;
      }

      .iconCircle {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        block-size: 64px;
        color: #fff;
        inline-size: 64px;
        margin-block-end: 27px;

        img {
          border-radius: 50%;
          block-size: 100%;
          inline-size: 100%;
          object-fit: cover;
        }
      }

      h6 {
        color: #000;
        font-family: Cairo-SemiBold;
        font-size: 20px;
        font-weight: 600;
        line-height: 37.48px;
        margin-block-end: 7px;
      }

      p {
        color: #000;
        font-family: Cairo-Light;
        font-size: 16px;
        font-weight: 300;
        line-height: 29.98px;
        text-align: justify;
      }
    }
  }

  .card:hover p,
  .card:hover h6 {
    color: #fff;
  }
}

@media (max-width: 600px) {
  .devices_section {
    .card {
      margin-inline: 10px !important;

      &:hover {
        transform: scale(1.03) !important;
        transition: 0.5s all ease-in-out;
      }

      .iconCircle {
        margin-block-end: 23px !important;
      }

      h6 {
        font-size: 18px !important;
        margin-block-end: 5px;
      }

      p {
        font-size: 14px !important;
      }
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
